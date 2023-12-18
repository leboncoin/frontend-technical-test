import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'

import ConversationCard from '@/components/conversation-card'

const meta = {
  title: 'Components/ConversationCard',
  component: ConversationCard,
} satisfies Meta<typeof ConversationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 99,
    lastMessageTimestamp: 1702906403870,
    name: 'Marie',
    userId: 99,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(
      canvas.getByRole('link', { name: /marie 18 december/i })
    ).toBeInTheDocument()
    expect(canvas.getByRole('img', { hidden: true })).toBeInTheDocument()
  },
}
