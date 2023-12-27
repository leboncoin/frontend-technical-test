import type { ReactElement } from "react";
import HomeLayout from "../components/HomeLayout/HomeLayout";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import { Conversation } from "../types/conversation";
import { get } from "../api";

interface Props {
  conversations: Conversation[];
}

const Home = ({ conversations }: Props): ReactElement => {
  return <HomeLayout conversations={conversations}></HomeLayout>;
};

export const getServerSideProps = (async () => {
  const userId = getLoggedUserId();

  const conversations: Conversation[] = await get(`conversations/${userId}`);

  return { props: { conversations } };
}) satisfies GetServerSideProps<Props>;

export default Home;
