// import useContext hook for react
import React, { useContext } from "react";
// import styling for chat using styled-components
import { ChatContainer, ChatInfo, ChatIcons } from "../css/ChatCss";
// import message component
import Messages from "./Messages";
// import input component
import Input from "./Input";
// import context for chat to handle chat submit
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    // styling for chat container
    <ChatContainer>
      <ChatInfo>
        {/* display user name */}
        <span>{data.user?.displayName}</span>
        <ChatIcons>
          {/* dummy images for video-camera, add user and more button */}
          <img
            src="https://cdn-icons-png.flaticon.com/128/2699/2699194.png"
            alt="video camera"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/4170/4170295.png"
            alt="add user"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/12274/12274724.png"
            alt="more"
          />
        </ChatIcons>
      </ChatInfo>
      <Messages />
      <Input />
    </ChatContainer>
  );
};

export default Chat;
