import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'

import Header from '@/components/header'

const meta = {
  title: 'Components/Header',
  component: Header,
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(
      canvas.getByRole('img', { name: /leboncoin frontend team/i })
    ).toBeInTheDocument()
    expect(canvas.getByRole('link', { name: /account/i })).toBeInTheDocument()
  },
}
