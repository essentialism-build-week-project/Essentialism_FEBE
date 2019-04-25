import { Button as baseButton } from "rebass";
import styled from "styled-components";

export const Button = styled(baseButton)`
  cursor: pointer;
  border: 1px solid black;
  &:hover {
    color: black;
    background-color: white;
  }
`;

export const Input = styled.input`
  padding: 1rem;
`;
