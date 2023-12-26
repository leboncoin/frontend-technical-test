import styled from "styled-components";

export const MessageBubble = styled.div`
  background-color: ${({ isOwner }) =>
    isOwner ? "rgba(220, 230, 255, 1)" : "rgba(61, 100, 253, 1)"};
  color: ${({ isOwner }) => (isOwner ? "#1a1a1b" : "#fff")};
  padding: 10px 15px;
  border-radius: 20px;
  align-self: ${({ isOwner }) => (isOwner ? "flex-start" : "flex-end")};
  max-width: 60%;
  line-height: 22px;
`;

export const Timestamp = styled.div`
  font-size: 12px;
  color: grey;
  text-align: ${({ isOwner }) => (isOwner ? "left" : "right")};
  margin-bottom: 10px;
  margin-left: ${({ isOwner }) => (isOwner ? "10px" : "")};
  margin-right: ${({ isOwner }) => (!isOwner ? "10px" : "")};
`;
