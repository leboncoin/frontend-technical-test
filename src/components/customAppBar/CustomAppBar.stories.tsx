import { ComponentMeta, ComponentStory } from '@storybook/react'

import CustomAppBar from './CustomAppBar'

export default {
  title: 'components/CustomAppBar',
  component: CustomAppBar,
} as ComponentMeta<typeof CustomAppBar>

const Template: ComponentStory<typeof CustomAppBar> = (args) => <CustomAppBar {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'My app bar',
}

export const WithBackArrow = Template.bind({})
WithBackArrow.args = {
  title: 'My app bar',
  isBackButton: true,
}
