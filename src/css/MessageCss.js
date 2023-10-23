// import styled component from styled-components
import { styled } from "styled-components";

// Message ody container
export const MessageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-direction: ${(props) =>
    props.isOwner === "owner" ? "row-reverse" : ""};
`;

// message main body container
export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  font-weight: 300;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

// styling for Messages content user image
export const MessageContent = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px; 
    align-items: ${(props) => (props.isOwner === "owner" ? "flex-end" : "")}; 

    p {
        background-color: ${(props) =>
          props.isOwner === "owner" ? "#4caf50" : "white"};   
        padding: 10px 20px;
        border-radius: ${(props) =>
          props.isOwner === "owner"
            ? "10px 0px 10px 10px"
            : "0px 10px 10px 10px"};    
        max-width: max-content;
        color: ${(props) => (props.isOwner === "owner" ? "white" : "")};   
    }
    img {
        width: 50%;
    }
}
`;
