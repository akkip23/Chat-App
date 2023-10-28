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
  // const [selectedUser, setSelectedUser] = useState("");
  const userData = [];

  const { currentUser } = useContext(AuthContext);

  // searched for user in the firebase
  const handleSearch = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot.size);
    try {
      // get the query Snapshot of the searched user if not found show message user not found
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userData.push(doc.data());
      });

      const filteredUserData = userData.filter((userData) =>
        userData.displayName.toLowerCase().includes(userName)
      );

      if (filteredUserData.length > 0) {
        setUser(filteredUserData);
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

  const handleSelect = async (selUser) => {
    //check whether the group exists if not create
    const combinedId =
      currentUser.uid > selUser.uid
        ? currentUser.uid + selUser.uid
        : selUser.uid + currentUser.uid;

    console.log(currentUser.uid);
    console.log(selUser.uid);
    console.log(combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists() && currentUser.uid != selUser.uid) {
        console.log("hi");
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create users chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selUser.uid,
            displayName: selUser.displayName,
            photoURL: selUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", selUser.uid), {
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
        {user &&
          user.map((filUserData, index) => (
            <SearchedUser key={index}>
              <UserChat onClick={() => handleSelect(filUserData)}>
                <img src={filUserData.photoURL} alt="" />
                <UserChatInfo>
                  <span>{filUserData.displayName}</span>
                </UserChatInfo>
              </UserChat>
            </SearchedUser>
          ))}
      </FindUser>
    </div>
  );
};

export default Search;
