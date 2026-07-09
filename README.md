# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercise :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

### Sketches :

Obvisouly, it is up to you to make something nice and pretty, you are free to design it the way you like. The sketches are here to give you an idea on how it should look.

<details>
  <summary>Click to see the sketches</summary>

Mobile list :

![](./sketches/list-mobile.jpg)

Desktop list :

![](./sketches/list-desktop.jpg)

Mobile conversation :

![](./sketches/conv-mobile.jpg)

Desktop conversation :

![](./sketches/conv-desktop.jpg)

</details>

### API :

You can find the API swagger file in `docs/api-swagger.yaml`.

For a better readibility, you can view it on [https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).

---

## Bonus 1 :

We provide some conversation samples, but can you improve the app so the user can now create new conversations ?

## Bonus 2 :

Our infrastructure is a bit shaky.. Sometimes the servers are crashing. “It’s not you, it’s me”, but maybe you can display something nice to warn the user and handle it gracefully.

## Do you want to make the app even better ?

Feel free to make as many improvements as you like.
We love creativity and technical challenges.

If you are out of ideas, here are some thoughts :

- As we want to reach our users anywhere, we need to make sure the app is performing well. What can you do to make it really fast ?

- Our goal is to support everybody in the country, including people with disabilities. As a good citizen and a good developer, can you make sure the app is accessible for everyone ?

- We all love to relax after a hard day’s work. It would be a shame if we didn’t feel confident enough about the upcoming automatic deployment. Are you sure everything has been tested thoroughly ?

---

# Implementation notes

## What was built

The starter page was replaced with a responsive messaging interface for the required use case:

- list every conversation for the logged-in user
- automatically open the newest conversation
- show the latest message preview and activity time for each conversation
- display the selected conversation messages in chronological order
- allow the logged-in user to send a new message
- allow the logged-in user to create a new empty conversation
- open an existing conversation instead of creating a duplicate when the contact already has a thread
- keep the interface usable on desktop and mobile

The logged-in user still comes from `getLoggedUserId()` and defaults to user `1`.

## Architecture choices

The implementation stays close to the provided scaffold and avoids extra runtime dependencies.

- `src/utils/messagingApi.ts` contains the small typed API client for the JSON server.
- `src/utils/messagingView.ts` contains pure display helpers for sorting, participant labels, conversation lookup, and date formatting.
- `src/utils/messageSafety.ts` centralizes the message guardrails used before posting a draft.
- `src/components/*` contains the conversation list, new-conversation control, thread, composer, and avatar components.
- `src/pages/index.tsx` coordinates the page state because the exercise is intentionally small and has one main screen.
- `src/styles/Home.module.css` contains the responsive layout and visual states.
- `src/server/middleware/conversations.js` adapts the JSON server so conversation queries return both sent and received threads for the logged-in user.

Conversation rows also display a last-message preview. To avoid fetching every message thread just to render the list, the conversation summary includes `lastMessageBody` alongside `lastMessageTimestamp`. When a new message is posted, the middleware writes the message and updates the matching conversation summary in the same request. In a production backend this would be a database transaction; here it is simulated in `db.json` because the exercise uses `json-server`.

Styling uses plain CSS Modules rather than Tailwind. This keeps the submission dependency-light, scoped, and easy to review for a small single-screen app. If the project grew or needed to align with an existing utility-first design system, migrating to Tailwind CSS would be straightforward; the latest checked version was Tailwind CSS `4.3.2`.

## Safety guards

The interface handles the shaky API and common input issues:

- loading, empty, and retryable error states for conversations and messages
- retryable contact loading and conversation creation failures
- outgoing messages are trimmed before sending
- empty messages cannot be submitted
- messages are limited to 1,000 characters
- the composer is disabled while sending
- failed sends keep the draft in place so the user can retry
- new messages appear only after the API confirms creation
- the conversation preview is updated after a confirmed send
- starting a conversation with an existing contact navigates to the existing thread instead of creating a duplicate

The message validation itself is kept as a pure helper so the maximum length, trimming, and empty-message checks can be unit tested without rendering the app.

## Accessibility and responsiveness

The UI uses semantic sections, headings, form labels, `role="status"` for loading feedback, and `role="alert"` for failures. Buttons have clear focus states and the mobile layout switches between the conversation list and thread view with a back action.

The interface also keeps common actions close to the messaging context: the composer uses an integrated send button, the conversation list supports search, and the new-conversation control suggests matching contacts while disabling creation when no contact is found.

## Performance notes

The current implementation keeps rendering work small by deriving sorted and filtered views with memoized helpers, avoiding unnecessary message fetches for the conversation list, and storing a denormalized last-message summary on each conversation. The app also polls quietly in the background so the UI can stay fresh without showing disruptive loading states.

A good next step would be introducing React Query for the server state. It would give us request caching, stale-while-revalidate behavior, mutation lifecycle helpers, retry policies, and clearer separation between remote data and local UI state. I kept it out of this version to avoid adding a larger dependency and refactor late in the exercise.

## Running the project

```bash
npm run start-server
npm run dev
```

The app expects the provided JSON server on `http://localhost:3005`.

## Verification

```bash
npm test
npm run test:e2e
npm run build
```

The Jest tests cover loading conversations, selecting a thread, filtering, creating a conversation, opening an existing thread instead of duplicating it, sending a message, blocking empty and over-limit messages, preserving drafts after failed sends, date formatting, and graceful API failures. The Playwright test covers the main desktop and mobile browsing path against the real Next app and JSON server.

The latest local verification passed with 19 Jest tests, 2 Playwright checks, and a successful production build.
