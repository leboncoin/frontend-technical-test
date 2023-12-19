import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'

import Home from '@/pages/index'

const meta = {
  title: 'Pages/Home',
  component: Home,
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(
      canvas.getByRole('link', { name: /conversations/i })
    ).toBeInTheDocument()
  },
}
