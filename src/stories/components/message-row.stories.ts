import type { Meta, StoryObj } from '@storybook/react'

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
}

export const NotLoggedUserMessage: Story = {
  args: {
    isLoggedUser: false,
    senderName: 'John',
  },
}
