import styled from 'styled-components'

export const Card = styled.article`
  margin: .5rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:focus,
  &:active {
    color: #ec6e24;
    border-color: #ec6e24;
  }

  & h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  & p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  & a,
  & a:visited {
    color:black;
    text-decoration: underline;
  }
  
  &:hover a,
  &:focus a,
  &:active a {
    color:#ec6e24;
  }
`