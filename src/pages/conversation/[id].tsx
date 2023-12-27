import { GetServerSideProps } from "next";
import React from "react";
import Chat from "../../components/Chat/Chat";
import { Message } from "../../types/message";
import { get } from "../../api";

interface Props {
  messages: Message[];
}

function Conversation({ messages }) {
  return <Chat messages={messages} />;
}

export const getServerSideProps = (async (context) => {
  const { id: conversationId } = context.query;

  const messages: Message[] = await get(`messages/${conversationId}`);

  return {
    props: {
      messages,
    },
  };
}) satisfies GetServerSideProps<any>;

export default Conversation;
