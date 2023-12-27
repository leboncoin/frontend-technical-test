import React from "react";
import styled from "styled-components";

export const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 90vh;
`;

export const MessagesContainer = styled.div`
  overflow-y: scroll;
  flex-grow: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputContainer = styled.div`
  border-top: 1px solid #ccc;
  padding: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 1px 3px #00000029;
`;

export const ConversationHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
`;

export const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: rgba(26, 26, 27, 1);
`;
