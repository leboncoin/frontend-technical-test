# Leboncoin Technical Test - Chat Application

# Introduction

This project showcases a simple yet effective chat application, designed and implemented as a technical test for Leboncoin. The focus was on creating user-friendly UI/UX, mirroring the simplicity of popular chat systems.

# Design

Initial designs focused on simplicity, avoiding user disorientation with complex changes.
Opted for separate pages for correspondents and conversations for clarity and focus on logic.

# Development

Created on a dedicated branch "test-antoine" to align with best practices in collaborative environments.
Utilized Styled-components for clearer, more organized code. Despite more experience with SASS and Tailwind, the scoping feature of Styled-components was advantageous.
Initial hard-coded implementation followed by dynamic data fetching.

Middleware in conversations.js: Faced an issue where the middleware intercepted the conversation/:id route, resulting in an empty array response. Resolved by adding a check in the conditional statement to exclude requests containing senderId, thus preventing unintended interceptions.

Persistent lastMessageTimestamp Update Issue: Encountered a bug where updates to lastMessageTimestamp in conversations were not reflected in real-time due to the static nature of the JSON database import. This requires server restarts to recognize updates in the JSON file, an issue that remains unresolved within the project's scope and time frame.

# Technical Challenges and Solutions

Implemented reusable API fetch functions for enhanced security, refactoring, and reusability.
Utilized useRef for auto-scrolling to the latest message in the chat.

# Version Control

Regular, feature-specific commits for clear historical tracking.

# UI Enhancements

Simple profile pictures using correspondents' first name initials.
Considered randomly generated backgrounds for each profile for personalization but prioritized time management.

# Future Improvements

Implement a login page redirection for non-logged users (current getLoggedUserId returns a hardcoded user).
Establish default color variables for consistent styling across components.
Explore WebSocket for real-time communication.
Enhance accessibility for inclusivity.

# Conclusion

This project, while limited by time constraints, demonstrates key aspects of chat application development with a focus on user experience, technical problem-solving, and clean code practices.

# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

---

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
