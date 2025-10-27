# 💬 Leboncoin Chat Application - Solution Documentation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start JSON Server (port 3005)
npm run server

# Start Next.js development server (port 3000)
npm run dev

# Run tests
npm test
```

## 🏗️ Architecture & Technical Choices

### Tech Stack

- **Next.js 15** with Pages Router - For server-side rendering and routing
- **React 19** - Latest React features with functional components
- **TypeScript** - Type safety and better development experience
- **JSON Server** - Mock API for development
- **Jest + Testing Library** - Unit testing framework

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Avatar.tsx       # User avatar with color generation
│   ├── Header.tsx       # App header component
│   ├── LoadingSpinner.tsx # Loading state component
│   └── NewConversationButton.tsx # New conversation functionality
├── hooks/
│   └── api.ts          # Custom hooks for API integration
├── pages/
│   ├── index.tsx       # Conversation list page
│   └── conversation/
│       └── page.tsx    # Individual conversation view
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and error handling
└── __tests__/          # Test files
```

## ✅ Features Implemented

### Core Requirements

- ✅ **Conversation List**: Display all conversations with user avatars
- ✅ **Message View**: Show message history in selected conversation
- ✅ **Send Messages**: Real-time message sending with optimistic updates
- ✅ **Responsive Design**: Works on desktop and mobile devices

### Bonus Features

- ✅ **Bonus 1**: Create new conversations with user selection
- ✅ **Bonus 2**: Graceful error handling with French-themed messages
- ✅ **Performance**: Custom hooks for efficient data fetching
- ✅ **Accessibility**: ARIA roles, keyboard navigation, screen reader support
- ✅ **Testing**: Comprehensive test coverage for critical functionality

## 🎯 Key Technical Decisions

### Custom Hooks Pattern

```typescript
// Centralized API logic with error handling
const { conversations, loading, error, refetch } = useConversations();
const { sendMessage, loading: sending } = useSendMessage();
```

### Component Architecture

- **Atomic Design**: Small, reusable components
- **Props Interface**: Clear TypeScript interfaces for all components
- **Error Boundaries**: Graceful error handling throughout the app

### Accessibility First

- Semantic HTML structure (`<main>`, `<ul>`, `<li>`)
- ARIA roles and labels for screen readers
- Keyboard navigation support (Enter, Space, Tab)
- Focus management with visual indicators

## 🧪 Testing Strategy

- **Unit Tests**: Core functionality and API hooks
- **Component Tests**: UI behavior and user interactions
- **Error Handling**: Network failures and edge cases
- **Coverage**: Critical user flows and business logic

## 📱 Mobile & Accessibility

### Responsive Design

- Viewport meta tag for proper mobile scaling
- Touch-friendly target sizes (44px minimum)
- Card-based layout with proper spacing
- Smooth transitions and hover effects

### Accessibility Features

- Screen reader support with descriptive labels
- Keyboard navigation for all interactive elements
- High contrast support and focus indicators
- Semantic HTML structure

## 🔮 Future Improvements

- **Real-time Updates**: WebSocket integration for live messaging
- **Message Status**: Read receipts and delivery indicators
- **File Sharing**: Image and document attachment support
- **Push Notifications**: Browser notifications for new messages
- **Dark Mode**: Theme switching capability
- **Message Search**: Full-text search across conversations

## 🚦 Performance Considerations

- **Lazy Loading**: Components loaded on demand
- **Memoization**: Prevent unnecessary re-renders
- **API Optimization**: Efficient data fetching patterns
- **Bundle Size**: Tree-shaking and code splitting ready

---

_Built with ❤️ for Leboncoin technical test_
