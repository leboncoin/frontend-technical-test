import { ComponentMeta, ComponentStory } from '@storybook/react'

import MessageInput from './MessageInput'

export default {
  title: 'components/MessageInput',
  component: MessageInput,
} as ComponentMeta<typeof MessageInput>

const Template: ComponentStory<typeof MessageInput> = (args) => <MessageInput {...args} />

export const Default = Template.bind({})
Default.args = {
  onSubmit: () => {},
}
