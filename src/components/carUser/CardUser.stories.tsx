import { ComponentMeta, ComponentStory } from '@storybook/react'

import CardUser from './CardUser'

export default {
  title: 'components/CardUser',
  component: CardUser,
} as ComponentMeta<typeof CardUser>

const Template: ComponentStory<typeof CardUser> = (args) => <CardUser {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'John Doe',
  href: '/user/1',
}
