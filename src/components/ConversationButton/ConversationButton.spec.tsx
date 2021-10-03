import { render, screen } from '@testing-library/react'
import React from 'react'
import ConversationButton from './ConversationButton'

test('render a ConversationButton', () => {
  render(<ConversationButton conversationId={2} friendId={3} />)
})
