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
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { getDateFormattedFromTimestamp } from "../../utils/getDateFormattedFromTimestamp";

interface Props {
  conversation: Conversation;
}

function Card({ conversation }: Props) {
  const userId = getLoggedUserId();
  return (
    <Container href={`/conversation/${conversation.id}`}>
      <ProfilePic src={Profile} />
      <CardInformations>
        <CardName>
          {userId === conversation.recipientId
            ? conversation.senderNickname
            : conversation.recipientNickname}
        </CardName>
        <CardDate>
          🕓 {getDateFormattedFromTimestamp(conversation.lastMessageTimestamp)}
        </CardDate>
      </CardInformations>
    </Container>
  );
}

export default Card;
