import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
      background: #000;
    }
    .pressed{
      background: #ccc;
    }  
`;

export const KeysStyle = styled.div`
  width: 800px;
  height: 400px;
  margin: 40px auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
`;
const textStyle = css`
  line-height: 500px;
  text-align: center;
  font-size: 50px;
`;

export const KeyStyle = styled.div`
  border: 4px solid black;
  background: #fff;
  flex: 1;
  ${textStyle}
  &:hover {
    background: #aaa;
  }
`;
