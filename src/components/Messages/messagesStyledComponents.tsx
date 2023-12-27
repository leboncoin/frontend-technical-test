import styled from "styled-components";

export const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2rem;
`;

export const MessageBubble = styled.div`
  background-color: ${({ isOwner }) =>
    isOwner ? "rgba(220, 230, 255, 1)" : "rgba(61, 100, 253, 1)"};
  color: ${({ isOwner }) => (isOwner ? "#1a1a1b" : "#fff")};
  padding: 10px 15px;
  align-self: ${({ isOwner }) => (isOwner ? "start" : "end")};
  border-radius: 20px;
  max-width: 60%;
  line-height: 22px;
`;

export const Timestamp = styled.div`
  font-size: 12px;
  color: grey;
  text-align: ${({ isOwner }) => (isOwner ? "left" : "right")};
  margin-top: 0.2rem;
  margin-left: ${({ isOwner }) => (isOwner ? "10px" : "")};
  margin-right: ${({ isOwner }) => (!isOwner ? "10px" : "")};
`;
