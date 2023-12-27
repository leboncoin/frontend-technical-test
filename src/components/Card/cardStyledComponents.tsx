import styled from "styled-components";

import Link from "next/link";

export const Container = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  position: relative;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  width: calc(100% + 8rem);
  padding: 1.2rem;
  color: grey;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 4.5px 4.5px 3.6px rgba(0, 0, 0, 0.01),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.016),
      30.1px 30.1px 24.1px rgba(0, 0, 0, 0.024),
      100px 100px 80px rgba(0, 0, 0, 0.04);
    &::after {
      content: "→";
      position: absolute;
      right: 10px;
      font-size: 1.5rem;
    }
  }
`;

export const ProfilePic = styled.div`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(300deg, #ff6633, #b71e07, #cfe50b);
  background-size: 180% 180%;
  animation: gradient-animation 18s ease infinite;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
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
