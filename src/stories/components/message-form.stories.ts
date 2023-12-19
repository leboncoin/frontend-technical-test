import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import MessageForm from '@/components/message-form'
import { reactQueryDecorator } from '../../../.storybook/decorators'

const meta = {
  title: 'Components/MessageForm',
  component: MessageForm,
  args: {
    authorId: 99,
    conversationId: 99,
  },
  parameters: {
    msw: {
      handlers: [
        rest.post('/api/message', async (req, res, ctx) => {
          const data = await req.json()

          return res(
            ctx.json({
              ...data,
              id: 99,
              timestamp: 1620284667,
            })
          )
        }),
      ],
    },
  },
  decorators: [reactQueryDecorator],
} satisfies Meta<typeof MessageForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
