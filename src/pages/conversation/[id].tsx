import { GetServerSideProps } from "next";
import React from "react";
import Chat from "../../components/Chat/Chat";
import { Message } from "../../types/message";
import { get, getAll } from "../../api";
import { Conversation } from "../../types/conversation";

interface Props {
  messages: Message[];
  conversation: Conversation;
}

function Conversation({ messages, conversation }: Props) {
  return <Chat messages={messages} conversation={conversation} />;
}

export const getServerSideProps = (async (context) => {
  const { id: conversationId } = context.query;

  const [messages, conversation] = await getAll([
    `messages/${conversationId}`,
    `conversation/${conversationId}`,
  ]);

  console.log(conversation);

  return {
    props: {
      messages,
      conversation,
    },
  };
}) satisfies GetServerSideProps<any>;

export default Conversation;
