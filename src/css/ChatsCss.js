// import styled component from styled-components
import { styled } from "styled-components";

// styling for main chats container body
export const ChatContainer = styled.div`
  padding: 20px 10px;
`;

// styling for main chat container
export const UserChat = styled.div`
  display: flex;
  img {
    background: #ddddf7;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

// chat information
export const UserChatInfo = styled.div`
  margin-left: 15px;
  span {
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
  p {
    margin-top: 2px;
    font-size: 14px;
    color: lightgray;
  }
`;
