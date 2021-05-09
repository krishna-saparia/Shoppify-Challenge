import styled from "styled-components";

export const AppHeader = styled.header`
  background-color: #fff;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  font-size: calc(10px + 2vmin);
  ${"" /* color: white; */}
  padding: 20px;
  cursor: pointer;
`;

export const HeaderTitle = styled.h2`
  margin: 10px;
  text-align: left;
  font-size: 36px
  font-color: #10606;
`;
