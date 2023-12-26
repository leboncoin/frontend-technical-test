import styled from "styled-components";
import Image from "next/image";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  border-radius: 10px;
  border: 1px solid lightgrey;
  width: 100%;
  padding: 1.2rem;
  &:hover {
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
    background-color: rgba(234, 234, 234, 1);
  }
`;

export const ProfilePic = styled(Image)`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`;

export const CardInformations = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CardName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: rgba(8, 7, 7, 1);
`;

export const CardDate = styled.div`
  color: grey;
  font-size: 0.8rem;
`;

export const MessagePreview = styled.div`
  font-size: 0.9rem;
  color: grey;
  margin-bottom: 0.5rem;
`;
