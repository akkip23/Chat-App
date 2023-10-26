// import styled component from styled-components
import { styled } from "styled-components";

export const NavbarBody = styled.div``;

// navBar main body container and for sending message
export const NavbarContainer = styled.div`
  background-color: #02020691;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  div {
    p {
      color: white;
      font-weight: bold;
    }
  }
  main {
    display: flex;
    align-items: center;
    width: 65%;
    justify-content: space-between;
    img {
      background: #ddddf7;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      object-fit: cover;
    }
    p {
      color: white;
      white-space: nowrap;
      width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    button {
      background: #f44336;
      font-size: 10px;
      color: #ddddf7;
      cursor: pointer;
      border: none;
    }
  }
`;
