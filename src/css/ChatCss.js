// import styled component from styled-components
import styled from "styled-components";

// styling for main chat container body
export const ChatContainer = styled.div`
  flex: 2;
`;

// style for main chat container
export const ChatInfo = styled.div`
  height: 50px;
  background-color: #5d5b8d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: lightgray;
`;

// styling for chat icons
export const ChatIcons = styled.div`
  display: flex;
  gap: 10px;
  img {
    height: 25px;
    cursor: pointer;
  }
`;
