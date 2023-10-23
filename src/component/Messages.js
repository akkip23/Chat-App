// import react hook from react packages
import React, { useContext, useEffect, useState } from "react";
// import styling for Messages using styled-components
import { MessageContainer } from "../css/MessagesCss";
import { ChatContext } from "../context/ChatContext";
// import onSnapshot from firebase to get realtime updates
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
// import message component
import Message from "./Message";

const Messages = () => {
  // useState hook to handle Message state
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // useEffect hook to handle realtime update using onsnapshot to update chats without rendering page
  useEffect(() => {
    console.log("data", data);
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      console.log(doc.data());

      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // console.log(messages);
  return (
    <MessageContainer>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </MessageContainer>
  );
};

export default Messages;
