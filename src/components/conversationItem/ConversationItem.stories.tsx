import { ComponentMeta, ComponentStory } from '@storybook/react'

import ConversationItem from './ConversationItem'

export default {
  title: 'components/ConversationItem',
  component: ConversationItem,
} as ComponentMeta<typeof ConversationItem>

const Template: ComponentStory<typeof ConversationItem> = (args) => <ConversationItem {...args} />

export const Default = Template.bind({})
Default.args = {
  conversation: {
    id: 1,
    recipientId: 1,
    recipientNickname: 'Jean',
    senderId: 2,
    senderNickname: 'John',
  },
}
