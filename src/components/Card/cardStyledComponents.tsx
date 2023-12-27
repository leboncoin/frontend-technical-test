import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  width: calc(100% + 8rem);
  padding: 1.2rem;
  color: white;
  transition: transform 0.1s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(220, 230, 255, 1);
    box-shadow: 2.3px 2.3px 4.1px -7px rgba(0, 0, 0, 0.03),
      5.4px 5.4px 9.4px -7px rgba(0, 0, 0, 0.044),
      9.7px 9.7px 16.9px -7px rgba(0, 0, 0, 0.055),
      16.1px 16.1px 28.1px -7px rgba(0, 0, 0, 0.065),
      26.5px 26.5px 46.3px -7px rgba(0, 0, 0, 0.075),
      46.2px 46.2px 80.9px -7px rgba(0, 0, 0, 0.088),
      100px 100px 175px -7px rgba(0, 0, 0, 0.11);
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
