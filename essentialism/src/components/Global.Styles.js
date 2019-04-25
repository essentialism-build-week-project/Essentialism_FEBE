import { Button as baseButton } from "rebass";
import styled from "styled-components";

export const Button = styled(baseButton)`
  cursor: pointer;
  color: black;
    background-color: white;
  border: 1px solid black;
  &:hover {
    color: white;
    background-color: black;
  }
`;

export const Input = styled.input`
  padding: 1rem;
`;

export const Container = styled.div`
  max-width: 900px;
  width: 98%;
  margin: 0 auto;
`