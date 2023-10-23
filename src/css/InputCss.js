// import styled component from styled-components
import { styled } from "styled-components";

// main input body container
export const InputContainer = styled.div`
  background: white;
  height: 50px;
  padding: 10px;
  display: flex;
  align-items: center;
  input {
    height: 50px;
    background-color: white;
    width: calc(80% - 20px);
    border: none;
    outline: none;
    font-size: 1.1rem;
    &::placeholder {
      color: lightgrey;
    }
  }
`;

// message body container
export const SendMessage = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: space-evenly;
  img {
    width: 25px;
  }
  button {
    padding: 10px 15px;
    background: #a8c489;
    border: none;
  }
`;
