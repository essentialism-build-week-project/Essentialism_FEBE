import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  width: 98%;
  margin: 0 auto;
`;

export const WrapperRow = styled.div`
  max-width: 800px;
  width: 98%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const WrapperColumn = styled.div`
  max-width: 500px;
  width: 98%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
