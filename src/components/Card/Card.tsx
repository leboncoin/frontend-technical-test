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

import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { getDateFormattedFromTimestamp } from "../../utils/getDateFormattedFromTimestamp";

interface Props {
  conversation: Conversation;
}

function Card({ conversation }: Props) {
  const userId = getLoggedUserId();

  const displayName =
    userId === conversation.recipientId
      ? conversation.senderNickname
      : conversation.recipientNickname;

  return (
    <Container href={`/conversation/${conversation.id}`}>
      <ProfilePic> {displayName.charAt(0).toUpperCase()} </ProfilePic>
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
