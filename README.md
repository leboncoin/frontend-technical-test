# leboncoin Frontend Technical Test — Messages

**Author:** Ignacio Mansilla Derqui — [github.com/imansilladerqui](https://github.com/imansilladerqui)

A messaging interface for leboncoin users to consult and send messages about a transaction or ask for information about a product. The app works on **desktop and mobile**, includes **safety guards** for production-scale usage, and implements both **bonus features** from the exercise.

API reference: [`docs/api-swagger.yaml`](docs/api-swagger.yaml) · [online viewer](https://leboncoin.tech/frontend-technical-test/)

---

## Quick start

```bash
pnpm install
pnpm start-server   # mock API on :3005
pnpm dev            # http://localhost:3000/messages
```

```bash
pnpm lint          # ESLint (next/core-web-vitals)
pnpm format:check  # Prettier check
pnpm format        # auto-format with Prettier
pnpm test:coverage # 84 unit tests + coverage report
pnpm test:e2e      # 6 end-to-end tests (Playwright)
pnpm test:all      # lint + format:check + coverage + build + e2e
pnpm build         # production build
```

CI enforces **≥85% lines**, **≥85% statements**, **≥85% functions**, and **≥65% branches** (Jest `coverageThreshold`), and publishes a coverage table in the GitHub Actions job summary.

Copy `.env.example` to `.env.local` to override `NEXT_PUBLIC_API_URL` if needed.

---

## The exercise — what was asked and what I built

### Core requirements

| Requirement                                 | Implementation                                                                                                              |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Display a list of all conversations**     | `ConversationList` fetches via `useConversationsQuery`, sorts by `lastMessageTimestamp`, shows loading / empty states       |
| **Allow the user to select a conversation** | Click updates the URL (`/messages?id=`) with shallow routing; selected item is highlighted; works with browser back/forward |
| **List all messages in a conversation**     | `MessageThread` loads messages via `useMessagesQuery`, sorts chronologically, auto-scrolls to the latest                    |
| **Type and send new messages**              | `MessageInput` + `useSendMessageMutation` with optimistic UI                                                                |
| **Desktop & mobile**                        | Split pane on desktop (380px list + thread); stacked on mobile with a back button                                           |
| **Safety guards**                           | Dedicated `src/lib/safety/` layer — see [Safety](#safety)                                                                   |

The UI follows the spirit of the provided sketches: leboncoin branding, conversation cards with avatars, message bubbles (blue for own messages, grey for incoming), and a pill-shaped input at the bottom of the thread.

### Bonus 1 — Create new conversations

The sample data only ships a few threads. I added a **"New conversation"** button that opens a native `<dialog>` modal:

- Loads all users via `useUsersQuery`
- Live search filter on nickname
- POST to `/api/conversations/{userId}` with `{ recipientId }` via `useCreateConversationMutation`
- On success: invalidates the conversations cache, closes the modal, navigates to the new thread

This keeps the flow self-contained — users never need to touch `db.json` to start a fresh conversation.

### Bonus 2 — Graceful error handling

The swagger spec documents **503 Unavailable** responses. When the mock server is down or returns an error, the app no longer silently shows an empty list.

Instead, a floating **`ErrorSnackbar`** appears at the bottom of the screen with the exercise copy — _"It's not you, it's me."_ — plus a contextual message, a **Retry now** button, an **auto-retry** after 30 seconds, and a dismiss action. Unexpected render crashes are still caught by a React Error Boundary with a full-page fallback.

See [Why a snackbar?](#why-a-snackbar-instead-of-an-inline-banner) for the reasoning behind this UX choice.

---

## Going further — improvements beyond the brief

The exercise also suggested performance, accessibility, and confidence for deployment. Here is what I added:

### Performance

- **`memo()`** on `ConversationItem` and `MessageBubble` to avoid re-rendering the full list on every keystroke
- **`useMemo`** for sorted conversation and message lists
- **`content-visibility: auto`** on message bubbles so the browser can skip painting off-screen messages in long threads
- **Optimistic send** — the message appears instantly; rollback on failure
- **React Query deduplication** — multiple hooks can subscribe to the same query without duplicate network calls
- **CSS-only avatars** (initials + colour hash) — no image requests
- **`cache: 'no-store'`** on all fetches to avoid stale browser HTTP cache (304 empty-body issues during development)

For a real deployment at leboncoin scale I would add list virtualization and pagination; the mock API returns all records in one shot, so that was out of scope here.

### Accessibility

- Semantic landmarks with `aria-label` on major sections
- `role="listbox"` / `role="log"` / `role="alert"` where appropriate
- `sr-only` label + `htmlFor` on the message textarea
- `aria-live` on the message log and character counter
- Visible `focus-visible` outlines on all interactive elements
- Native `<dialog>` for the modal (built-in focus trap and backdrop)

### Safety

All guards live in `src/lib/safety/`:

| Module                           | Role                                                                   |
| -------------------------------- | ---------------------------------------------------------------------- |
| `validateId`                     | Reject non-integer / unsafe IDs from the URL and user actions          |
| `sanitizeMessage`                | Trim whitespace, reject empty input, enforce max length                |
| `parseApiResponse`               | Schema-filter every API payload; strip sensitive user fields (`token`) |
| `canAccessConversation`          | Block viewing conversations the logged user is not part of             |
| `rateLimiter`                    | Per-conversation send cooldown (client-side throttle)                  |
| Send debounce + duplicate window | Prevent accidental double-send of the same text                        |

The send mutation rolls back optimistic data on failure so the UI never lies permanently.

### Testing

**84 Jest tests** + **6 Playwright E2E tests** — CI runs `pnpm test:all` (lint, Prettier, coverage, build, e2e) on every push and publishes the coverage table in the job summary.

| Layer                | What's covered                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Safety libs**      | `parseApiResponse`, `validateId`, `sanitizeMessage`, `rateLimiter`, `canAccessConversation`                                                |
| **API hooks**        | All 5 React Query hooks with mocked `fetch` (success + 503 error paths)                                                                    |
| **Components**       | `ConversationList`, `MessageThread`, `MessageInput`, `ErrorSnackbar`, `NewConversationModal`, `MessagesPage`, `ErrorFallback`              |
| **Hooks**            | `useMessagesPage` responsive logic, URL selection, invalid ID cleanup                                                                      |
| **Error boundary**   | Render crash → fallback UI → reload                                                                                                        |
| **E2E (Playwright)** | Load conversations, open thread, send message, new-conversation modal, error snackbar on 503, desktop split layout, mobile back navigation |

Component unit tests mock colocated hooks where it keeps tests fast; API hook tests exercise the real `fetch` → `parse*` pipeline; E2E tests run against the live app with the mock API server.

---

## React Query — implementation and why

I replaced the starter **SWR** setup with **TanStack React Query** because messaging is a classic server-state problem: lists that go stale, mutations that must invalidate related queries, and optimistic updates on send.

### How it is structured

```
src/api/
  queries.ts                  ← useConversationsQuery, useMessagesQuery, useUsersQuery
  mutations.ts                ← useSendMessageMutation, useCreateConversationMutation

src/lib/react-query.ts        ← shared QueryClient + cache keys
```

Each hook follows the same simple pattern: **`fetch` → `json` → `parse*`**. If the response is not OK, the `queryFn` throws and React Query exposes `error` to the UI — no extra HTTP wrapper.

```typescript
const res = await fetch(`/api/conversations/${userId}`, { cache: 'no-store' })
if (!res.ok) throw new Error(`Request failed (${res.status})`)
return parseConversations(await res.json())
```

### Key decisions

| Decision                                               | Why                                                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Centralised `queryKeys`**                            | Predictable invalidation — sending a message invalidates both `messages` and `conversations` keys |
| **`staleTime: 0` on conversations & messages**         | Messaging data must feel live; edits to the mock `db.json` show up immediately on refetch         |
| **`refetchOnWindowFocus: true` on messages**           | Returning to the tab picks up new messages from the other user                                    |
| **Optimistic `onMutate` / `onError` rollback** on send | Instant feedback without waiting for the server round-trip                                        |
| **`invalidateQueries` on settled**                     | Ensures server truth wins after the mutation completes                                            |
| **Default client `staleTime: 5 min`**                  | Users list (modal) can stay cached longer since it changes rarely                                 |

React Query also **deduplicates** requests — `useMessagesPage` and `useConversationList` both call `useConversationsQuery`, but only one network request is made.

---

## Tailwind CSS — implementation and why

The project originally used **CSS Modules** (one `.module.css` per component). I migrated everything to **Tailwind CSS v4** with the PostCSS plugin (`@tailwindcss/postcss`).

### How it is set up

- `postcss.config.mjs` — enables the Tailwind v4 PostCSS plugin
- `src/styles/globals.css` — `@import 'tailwindcss'`, brand theme tokens, base resets, snackbar animation
- Components use **utility classes directly in JSX** — no separate stylesheet per component

### Brand tokens

```css
@theme {
  --color-brand: #ff6e14; /* leboncoin orange */
  --color-brand-hover: #e55f0a;
  --color-primary: #1a73e8; /* message bubbles, links */
  --color-primary-hover: #1558b0;
  --color-danger: #d32f2f;
}
```

This keeps colours consistent (`text-brand`, `bg-primary`, `border-l-brand`) and makes theme changes a one-line edit.

### Why Tailwind over CSS Modules

| Reason                              | Detail                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Co-location**                     | Styles live next to markup — no context-switching between `.tsx` and `.module.css`                                                          |
| **Responsive design**               | Breakpoints are inline (`max-lg:block`, `lg:w-[380px]`) which made the mobile/desktop split in `MessagesPage` much easier to reason about   |
| **Design tokens**                   | Brand colours defined once in `@theme`, reused everywhere                                                                                   |
| **Smaller surface area**            | 12 CSS module files removed; one `globals.css` for shared concerns (resets, dialog backdrop, snackbar animation)                            |
| **Utility-first fits the exercise** | A messaging UI is mostly layout, spacing, and colour — Tailwind handles that without inventing class names like `.conversationItemSelected` |

Custom animations that Tailwind does not ship (snackbar slide-up, dialog backdrop) stay in `globals.css` as `@utility` / `@layer` rules.

---

## Error snackbar — implementation and why

### What it does

`src/components/ErrorSnackbar/ErrorSnackbar.tsx` is shown when a React Query fetch fails (conversations or messages):

1. **Portaled to `document.body`** via `createPortal` — floats above all content, does not push the layout
2. **Slide-up animation** (`animate-snackbar-in` in `globals.css`)
3. **Headline:** _"It's not you, it's me."_ (exact exercise wording)
4. **Body:** the actual `error.message` from React Query (e.g. `Request failed (503)`)
5. **Retry now** — calls `refetch()` immediately
6. **Auto-retry** — countdown from 30s, then calls `refetch()` once
7. **Dismiss** — hides the snackbar until the error clears
8. **`role="alert"` + `aria-live="assertive"`** — announced to screen readers

### Why a snackbar instead of an inline banner

| Inline banner (first version)                 | Snackbar (current)                          |
| --------------------------------------------- | ------------------------------------------- |
| Pushes content down inside the list or thread | Overlays the bottom — layout stays stable   |
| Feels like a form validation error            | Feels like a transient infrastructure issue |
| Competes visually with conversation cards     | Clearly separated from the message UI       |
| Easy to miss on mobile when scrolled          | Fixed to the viewport — always visible      |

Server outages are **temporary and global** — a snackbar communicates that better than an inline alert wedged between a header and a list. The auto-retry matches the real-world pattern of "try again in a moment" without forcing the user to find a retry button.

### How errors reach the snackbar

```
fetch → throw on !res.ok (or network failure)
    ↓
React Query sets query.error
    ↓
useConversationList / useMessageThread expose error + refetch
    ↓
<ErrorSnackbar message={error.message} onRetry={refetch} />
```

No HTTP abstraction layer — the hook throws, React Query catches, the component displays the message. The only guard is `if (!res.ok) throw …` so a **503** does not silently parse into an empty list.

---

## Project structure

```
src/
  api/
    queries.ts                # React Query read hooks
    mutations.ts              # React Query write hooks
  components/
    ConversationList/         # List + useConversationList
    MessageThread/            # Thread, header, bubbles + useMessageThread
    MessagesPage/             # Page layout + useMessagesPage
    NewConversationModal/     # Bonus 1
    ErrorSnackbar/            # Bonus 2
    ErrorFallback.tsx         # Render crash fallback
    …
  lib/
    conversation.ts           # Contact helpers + access check
    display.ts                  # Dates + avatar helpers
    react-query.ts              # QueryClient + cache keys
    safety/                     # Input validation & parsing
  middleware.ts                 # Proxies /api/* → mock server
  pages/                        # Next.js routes
  types/
    domain.ts                   # Conversation, Message, User, …
    components.ts               # Component prop types
```

---

## Notes

- The logged-in user is hardcoded to ID `1` via `loggedUserId` in `src/pages/_app.tsx` — sufficient for this exercise.
- POST message body includes the full shape (`conversationId`, `authorId`, `body`, `timestamp`) because json-server only persists fields present in the request body.
- `src/middleware.ts` proxies `/api/*` to the mock server on `:3005`, keeping the frontend on same-origin URLs.
