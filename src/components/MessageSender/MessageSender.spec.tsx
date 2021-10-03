import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import MessageSender from './MessageSender'

test('render a MessageSender & check if send message properly', () => {
  const onSend = jest.fn()
  render(<MessageSender onSend={onSend} />)
  userEvent.type(
    screen.getByTestId('message-input'),
    'coucou ça roule ?',
  )
  fireEvent.submit(screen.getByTestId('message-form'))
  expect(onSend).toHaveBeenCalled()
  expect(onSend).toHaveBeenCalledWith('coucou ça roule ?')
})
