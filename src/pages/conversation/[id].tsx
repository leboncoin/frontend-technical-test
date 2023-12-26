import { GetServerSideProps } from "next";
import React from "react";
import Chat from "../../components/Chat/Chat";
import { Message } from "../../types/message";

interface Props {
  messages: Message[];
}

function Conversation({ messages }) {
  return <Chat messages={messages} />;
}

export const getServerSideProps = (async (context) => {
  const { id: conversationId } = context.query;
  const res = await fetch(
    `${process.env.NEXT_API_URL}messages/${conversationId}`
  );
  const messages = await res.json();

  return {
    props: {
      messages,
    },
  };
}) satisfies GetServerSideProps<any>;

export default Conversation;
