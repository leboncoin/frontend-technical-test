import type { ReactElement } from "react";
import HomeLayout from "../components/HomeLayout/HomeLayout";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import { Conversation } from "../types/conversation";

interface Props {
  conversations: Conversation[];
}

const Home = ({ conversations }: Props): ReactElement => {
  return <HomeLayout conversations={conversations}></HomeLayout>;
};

export const getServerSideProps = (async () => {
  const userId = getLoggedUserId();
  const res = await fetch(`${process.env.NEXT_API_URL}conversations/${userId}`);
  const conversations: Conversation[] = await res.json();

  return { props: { conversations } };
}) satisfies GetServerSideProps<Props>;

export default Home;
