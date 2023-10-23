// import react hook from react packages
import React, { useContext, useState } from "react";
// import styling for search using styled-components
import { FindUser, SearchedUser } from "../css/SearchCss";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
// import styling for chats using styled-components
import { UserChat, UserChatInfo } from "../css/ChatsCss";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  // useState hook to handle user name state, setUser state,  and handle err state
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  // if enter if is pressed search for searched user data
  const handleKeySubmit = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group exists if not create

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create users chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log("error", error);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div>
      <FindUser>
        <input
          type="text"
          value={userName}
          onKeyDown={handleKeySubmit}
          onChange={(e) =>
            e.target.value === "" ? setUser(null) : setUserName(e.target.value)
          }
          placeholder="Find Chats"
        />
        {err && <span>User not found!</span>}
        {user && (
          <SearchedUser>
            <UserChat onClick={handleSelect}>
              <img src={user.photoURL} alt="" />
              <UserChatInfo>
                <span>{user.displayName}</span>
              </UserChatInfo>
            </UserChat>
          </SearchedUser>
        )}
      </FindUser>
    </div>
  );
};

export default Search;
