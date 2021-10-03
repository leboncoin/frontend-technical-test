import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import ConversationSender from './ConversationSender'

test('render a ConversationSender. should not send message if only one field', () => {
  const onSend = jest.fn()
  render(<ConversationSender onSend={onSend} />)
  userEvent.type(
    screen.getByTestId('message-input'),
    'coucou ça roule ?',
  )
  fireEvent.submit(screen.getByTestId('conversation-form'))
  expect(onSend).not.toHaveBeenCalled()
})

test('should send message if all fields valid', () => {
  const onSend = jest.fn()
  render(<ConversationSender onSend={onSend} />)
  userEvent.type(
    screen.getByTestId('message-input'),
    "coucou bob l'eponge",
  )
  userEvent.type(screen.getByTestId('nickname-input'), 'spongebob')
  fireEvent.submit(screen.getByTestId('conversation-form'))
  expect(onSend).toHaveBeenCalledWith({
    message: "coucou bob l'eponge",
    nickname: 'spongebob',
  })
})

test('should send message if all fields valid & click on button', () => {
  const onSend = jest.fn()
  render(<ConversationSender onSend={onSend} />)
  userEvent.type(
    screen.getByTestId('message-input'),
    "salut c'est patrick",
  )
  userEvent.type(screen.getByTestId('nickname-input'), 'spongebob')
  userEvent.click(screen.getByTestId('send-button'))
  expect(onSend).toHaveBeenCalledWith({
    message: "salut c'est patrick",
    nickname: 'spongebob',
  })
})
