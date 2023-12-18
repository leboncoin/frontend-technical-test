This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the REST API server:

```bash
npm run start-server
```

This will leave the API available on port 3005.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

This project uses Next.js's `page` router.

Inside the `src` directory, we have the following structure:

- `__tests__/`: Testing-Library tests
- `api/`: Functions to communicate with the API
- `assets/`: Static assets, like images or custom fonts
- `components/`: Reusable React components
- `layouts/`: Layouts components to use as templates for other components
- `mocks/`: Mock data for tests
- `pages/`: Next.js `page router`. Routes are created based on file colocation inside this folder
- `server/`: A `json-server` project
- `stories/`: Storybook stories
- `styles/`: Global and other independent style files
- `types/`: TypeScript's type definitions
- `utils/`: Any other utilities available to be reused in the application

## Tooling

For a better development experience, this project uses the following tools:

- Formatting: Prettier
- Linting: Eslint
- Type checking: TypeScript
- Styling: Tailwind.css
- Server sync: Tanstack/React-Query
- Component development: Storybook
- Tests: Storybook test runner (uses Testing Library and Playwright under the hood)
- Schema validation: Zod
- Form management: React-Hook-Form

## Run Tests

First start your Storybook

```bash
npm run storybook
```

And then run your tests:

| You may be asked to install Playwright before the first run

```bash
npm run test-storybook
```

## Solution Rationale

1. Understanding the assignment

---

First thing is to understand what is being asked and what we have to start with.

Carefully reading the challenge description and the project provided.

Check if there is any doubt about the assignment and create a list of things to do. I like to separate this list into two bigger scopes: **Required** and **Nice to Have**.

I start prioritizing the **Required** list, and, if I still have time left, go through the other list.

---

2. Initial setup check

---

Now it's time to run the initial project for the assignment.

In this case was just a check to see if the project is running normally, the Next.js and the json-server apps.

All fine, so also good to check for dependencies vulnerabilities. The project had some, which were solved with some quick updates and removing some unecessary libs.

I decided to keep the project using Next.js 13 with the page router. Updating to 14 or moving to the app/ router seemed to me out of scope for this assignment, bringing little to no value at this moment.

---

3. Styling

---

The project had Styled-Components installed and also already had one page using CSS modules.

As the description gave me the option to pick whatever I wanted, I decided to go with Tailwind.css, because it is easier to set up, has a smaller boilerplate, and easily integrates with Next.js, with no extra steps to work with server-generated files. This is very important for me with limited time to deliver the project and I also noticed that the [Leboncoin website](https://www.leboncoin.fr/) also uses a utility style library.

That said, I removed the Styled-Components lib and added Tailwind.css.

You can also notice that I took some inspiration from the Leboncoin website for some components.

---

4. Formatting and Linting

---

Following new good practices suggestions ([some references here](https://youtu.be/Cd-gBxzcsdA?si=L4OwGoHGUNqgw0Zm)), I like to separate my formatting and linting tools to make them work faster.

So I set Prettier to do my formatting, cleaned up my Eslint rules, added a Tailwind plugin to help me handle classes, and also added [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to make Prettier and Eslint not step in each other toes.

All good, now to increase my DX (if it was a project that I was developing with a team, I would check first what is the team's opinion on this) I added the "format on save" rule and also suggested some VSCode extensions in the [`.vscode/`](../.vscode/settings.json) directory.

To enforce the code formatting and linting, I also set Husky with Lint-Staged to check the staged files before a commit (see [`.lintstagedrc.js`](../.lintstagedrc.js)).

---

5. Server sync

---

Most of this project is the communication with the server.

So to help keep the front-end in sync with the server state (and handling cache and other stuff for us), I used React-Query to do prefetching on the server side.

---

6. Error handling

---

I did not create any custom error page and decided to go with Next.js default ones.

My point here is that I would not be doing anything really amazing on those pages, probably just changing their styling to something more aligned with the other pages. So I just focused on other improvements and left it as it is.

I also rely on the error page and the default Error Boundary for some errors (like request ones).

---

7. Auth

---

This would probably be my next improvement if given more time.

I could just make some other simple session handling here, like keeping the session state in a React Context on the front-end, but this is not too far from what was given initially.

My idea would be to just use something like [NextAuth](https://next-auth.js.org/) with the Credentials provider.

This is why the Home page is too simple. The initial idea was to keep the login/logout buttons here and redirect to `/conversations/` on login.

I implemented the check on the `/conversations/` and `/conversation/:id` routes to redirect back to the home if no user is logged in. But right now this part has no use.

---

8. Tests and Documentation

---

Here I took the chance to also use some tooling that I like more than just using Jest and Testing-Library.

I use StoryBook to create some stories that describe all possible states of our components.

This is great for project reference and helps a lot when you need to develop components for parts of the application that are very deep into the user flow and also to emulate some hard-to-get situations otherwise.

As we have our component isolated in stories, makes total sense to use it to develop our tests. This is what I'm doing here with Interaction Tests inside the `play` function of each story.

In the case of running it in a CI, we can do it with the command:

```bash
npm run test-storybook
```

Just make sure that you have StoryBook running before the tests.

One advantage of using StoryBook for tests is that we take smoke tests for free. Even if we don't have any Interaction Tests, the test runner will check if the component renders normally.

To help with the components that rely on network connections, we have MSW. It will intercep and mock all requests that we want to handle, making it easy to have resilient tests and to fine-tune our request to some conditions, like making the connection hangin' indefinitely.

All of this serves also as a great documentation. It even makes it easy to share the project with non-tech people.

---

9. Accessibility

---

Here we are also using StoryBook to help us. With the accessibility addon, we have insights into how are our components performing with the accessibility rules.

You could check these insights in the `Accessibility` tab in the StoryBook panel.

For example, we could check that we have a failing check (purposely left) on the orange button with white text. This component is using the colors from the Leboncoin website.

We could also easily include these checks automatically in our tests using tools like Axe. I didn't add it here because of this failing check that I wanted to leave.

---

10. Other improvements

---

#### Real-time chat

One possible thing to improve is changing the server communication to something like Websockets. This way we could have realtime messages from the server without any user input.

#### Performance

The assignment description makes a point of asking about how to make our app faster for our users.

The answer here is to look for possible bottlenecks. Image/font sizes, prefetch, use of CDNs, server distributions close to the user, and others.

I tried to apply the best practices here. Next.js already does an excellent job here with its defaults.

The key thing here IMHO is to keep monitoring. Using analytics and health check tools is essential for the application improvement.
