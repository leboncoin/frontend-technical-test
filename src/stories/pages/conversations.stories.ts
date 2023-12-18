import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import { within, expect } from '@storybook/test'

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const list = await canvas.findByRole('list')
    const listScope = within(list)

    expect(listScope.getAllByRole('link')).toHaveLength(4)
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emptyMessage = await canvas.findByRole('heading', {
      name: /no messages yet\.\.\./i,
    })

    expect(emptyMessage).toBeInTheDocument()
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
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const loadingMessage = canvas.getByRole('heading', {
      name: /loading\.\.\./i,
    })

    expect(loadingMessage).toBeInTheDocument()
  },
}
