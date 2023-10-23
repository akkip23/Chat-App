// import react hook from react packages
import React, { useContext, useEffect, useState } from "react";
// import styling for chats using styled-components
import { ChatContainer, UserChat, UserChatInfo } from "../css/ChatsCss";
import { AuthContext } from "../context/AuthContext";
// import onSnapshot from firebase to get realtime updates of chats without reloding the page
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
// import context for chat to handle chat submit
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  // useState hooks to handle chats submit
  const [chats, setChats] = useState([]);
  // use Context hook for current user
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // useEffect hook to get realtime updates of user Chats
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // select chat and display selected chat in chats section
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    // styling for chats container
    <ChatContainer>
      {/* user chats */}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <UserChat
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <UserChatInfo>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </UserChatInfo>
          </UserChat>
        ))}
    </ChatContainer>
  );
};

export default Chats;
