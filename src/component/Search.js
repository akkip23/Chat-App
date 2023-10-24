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
import { createToast } from "../tosterMessages/static_tosterMsg";

const Search = () => {
  // useState hook to handle user name state, setUser state,  and handle err state
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // searched for user in the firebase
  const handleSearch = async () => {
    // get the collection of the searched user for the firebase
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      // get the query Snapshot of the searched user if not found how message user not found
      if (querySnapshot.size != 0) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } else {
        // toster message if the user is not found
        createToast("info", "No Chat Found for searched user");
      }
    } catch (error) {
      createToast("error", error.code);
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
      createToast("error", error.code);
    }

    setUser(null);
    setUserName("");
  };

  const handlseSetUser = (e) => {
    if (e.target.value == "") {
      setUser(null);
      setUserName("");
      // setErr(false);
    } else {
      setUserName(e.target.value);
    }
  };

  return (
    <div>
      <FindUser>
        <input
          type="text"
          value={userName}
          onKeyDown={handleKeySubmit}
          onChange={(e) => handlseSetUser(e)}
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
