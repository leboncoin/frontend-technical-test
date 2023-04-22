# 1. Design

I conducted a benchmark of chat rooms from Leboncoin, Malt, and Facebook Messenger and drew inspiration from them to create a mix of designs for the project. I also used the sketches provided in the exercise.

# 2. UI Development

To save time, I chose to use the @mui library.

The `components` repository contains only presentation components, including 18 components from @mui that I used to build other components (e.g. ConversationCard, Message) and containers (e.g. Chat, Conversations).

# 3. Install libraries & Configure the project

I set up the .env file for SERVER_HOST and added aliases to tsconfig.json:

```"@Components/*": ["src/components/*"],
      "@Containers/*": ["src/containers/*"],
      "@Api/*": ["src/api/*"],
      "@Utils/*": ["src/utils/*"],
      "@Assets/*": ["src/assets/*"],
      "@Styles/*": ["src/styles/*"],
      "@Types/*": ["src/types/*"]
```

I also installed React Query, which simplifies cache management, asynchronous requests, performance optimization, and error handling for applications.

# 4. Containers

These components have chat logic built into them.

- Conversations: Displays all conversations, and allows for adding or removing a conversation.
- Chat: Displays all messages, and allows for adding a message.
- Notifications: Provides a Notification service that displays an alert in case of an error.
- User: Provides the userId to the app through a Context.

# 5. Pages

- `/conversations`
- `/conversations/id`
- Pages prefetch api call to improve performance
- The homepage is redirected to /conversations.

# Time spent

10 hours
