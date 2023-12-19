import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import Conversation from '@/pages/conversations/[id]'

import { SERVER_URL } from '@/utils/constants'
import { conversation, message } from '@/mocks/index'

import { reactQueryDecorator } from '../../../.storybook/decorators'

const meta = {
  title: 'Pages/Conversation',
  component: Conversation,
  args: {
    conversation,
  },
  decorators: [reactQueryDecorator],
} satisfies Meta<typeof Conversation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${SERVER_URL}/messages/*`, (req, res, ctx) => {
          return res(ctx.json([message]))
        }),
      ],
    },
  },
}

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${SERVER_URL}/messages/*`, (req, res, ctx) => {
          return res(ctx.json([]))
        }),
      ],
    },
  },
}
