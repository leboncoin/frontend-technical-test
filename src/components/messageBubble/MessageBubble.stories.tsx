import { ComponentMeta, ComponentStory } from '@storybook/react'

import MessageBubble from './MessageBubble'
import { messageBubbleStubs } from './MessageBubble.stubs'

export default {
  title: 'components/MessageBubble',
  component: MessageBubble,
} as ComponentMeta<typeof MessageBubble>

const Template: ComponentStory<typeof MessageBubble> = (args) => <MessageBubble {...args} />

export const Default = Template.bind({})
Default.args = {
  message: messageBubbleStubs,
  loggedUserId: '1',
}

export const MessageReceived = Template.bind({})
MessageReceived.args = {
  message: messageBubbleStubs,
  loggedUserId: '2',
}
