import React from "react";
import {
  CardInformations,
  Container,
  CardDate,
  CardName,
  ProfilePic,
  MessagePreview,
} from "./cardStyledComponents";
import { Conversation } from "../../types/conversation";

import Profile from "../../assets/img-profilepic.jpg";

interface Props {
  conversation: Conversation;
}

function Card({ conversation }: Props) {
  return (
    <Container>
      <ProfilePic src={Profile} />
      <CardInformations>
        <CardName>{conversation.recipientNickname}</CardName>
        <MessagePreview>Hey, what's going on?</MessagePreview>
        <CardDate>🕓 Today | 9:30 PM</CardDate>
      </CardInformations>
    </Container>
  );
}

export default Card;
