import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import Conversations from '@/pages/conversations'

import { SERVER_URL } from '@/utils/constants'
import { conversations } from '@/mocks/index'

import { reactQueryDecorator } from '../../../.storybook/decorators'

const meta = {
  title: 'Pages/Conversations',
  component: Conversations,
  decorators: [reactQueryDecorator],
} satisfies Meta<typeof Conversations>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${SERVER_URL}/conversations/*`, (req, res, ctx) => {
          return res(ctx.json(conversations))
        }),
      ],
    },
  },
}

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${SERVER_URL}/conversations/*`, (req, res, ctx) => {
          return res(ctx.json([]))
        }),
      ],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${SERVER_URL}/conversations/*`, (req, res, ctx) => {
          return res(ctx.delay('infinite'))
        }),
      ],
    },
  },
}
