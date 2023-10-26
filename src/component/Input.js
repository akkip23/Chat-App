// import react hook from react packages
import React, { useState, useContext } from "react";
// import styling for chats using styled-components
import { InputContainer, SendMessage } from "../css/InputCss";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
// import updateDoc component to update Document
import {
  Timestamp,
  arrayUnion,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
// import uuid use to create non-sequential url-friendly unique id's
import { v4 as uuid } from "uuid";
// import storage ref to upload image send to chat
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { createToast } from "../tosterMessages/static_tosterMsg";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text != "" && data.user.displayName != undefined) {
      if (img) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            //TODO:Handle Error
          },
          async () => {
            // get the download url when the image gets uploaded to the firebase server
            await getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                // update chats on user input when user send the chat with image
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                }).then(() => {
                  createToast("success", "Message send SuccessFully");
                });
              }
            );
          }
        );
      } else {
        // update chats on user input when user send the chat without image
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        })
          .then(() => {
            createToast("success", "Message send SuccessFully");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            return;
          });
      }

      // update user last message
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
    }
  };

  return (
    <InputContainer>
      {/* text input to enter message  */}
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
      />
      <SendMessage>
        <img
          src="https://cdn-icons-png.flaticon.com/128/8377/8377269.png"
          alt="Attach File"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* upload file or image */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10054/10054290.png"
            alt="attach simage"
          />
        </label>
        {/* send chat */}
        <button onClick={handleSend}>Send</button>
      </SendMessage>
    </InputContainer>
  );
};

export default Input;
