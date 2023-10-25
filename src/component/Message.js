// import react hook from react packages
import React, { useContext, useEffect, useRef } from "react";
// useContext hooks from react
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
// import styling for Message using styled-components
import {
  MessageInfo,
  MessageContent,
  MessageContainer,
} from "../css/MessageCss";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  // when user enter a message and send it shows a smooth scroll behaviour
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <MessageContainer
      // check if the seder of the message is the owner or the chat user
      isOwner={message.senderId === currentUser.uid ? "owner" : "message"}
      ref={ref}
      // className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* styling for message information container */}
      <MessageInfo>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </MessageInfo>
      <MessageContent
        isOwner={message.senderId === currentUser.uid ? "owner" : "message"}
      >
        {message.img && <img src={message.img} alt="" />}
        <p>{message.text}</p>
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
