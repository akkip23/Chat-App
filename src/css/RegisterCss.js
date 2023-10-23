// import styled component from styled-components
import { styled } from "styled-components";

// sing up body container
export const SignUpBodyContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0;
`;

// main sign up container and form input container
export const SignUpConatiner = styled.div`
  background: white;
  width: 700px;
  height: 450px;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  align-items: center;
  box-shadow: 0px 0px 10px 0px black;
  h2 {
    margin-bottom: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  form > div {
    margin-top: 15px;
  }
  input {
    width: 250px;
    height: 20px;
    padding: 10px 15px;
    text-overflow: ellipsis;
    font-size: 1rem;
  }
  button {
    padding: 10px 115px;
    font-size: 1rem;
    background: #000000;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  img {
    width: 40px;
  }
`;
