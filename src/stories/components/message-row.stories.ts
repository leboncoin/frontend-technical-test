import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'

import MessageRow from '@/components/message-row'

const meta = {
  title: 'Components/MessageRow',
  component: MessageRow,
  args: {
    messageBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
} satisfies Meta<typeof MessageRow>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedUserMessage: Story = {
  args: {
    isLoggedUser: true,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(
      canvas.getByText(
        /lorem ipsum dolor sit amet, consectetur adipiscing elit\./i
      )
    ).toBeInTheDocument()
  },
}

export const NotLoggedUserMessage: Story = {
  args: {
    isLoggedUser: false,
    senderName: 'John',
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByText(/john/i)).toBeInTheDocument()
  },
}
