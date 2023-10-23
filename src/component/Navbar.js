// import react hook from react packages
import React, { useContext } from "react";
// import styling for NavBar using styled-components
import { NavbarBody, NavbarContainer } from "../css/NavbarCss";
// signOut function from firebase to sign out current authenticated user
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  // handle signOut
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    // styling for NavBar Body
    <NavbarBody>
      <NavbarContainer>
        <div>
          {/* chat Name */}
          <p>Lama Chat</p>
        </div>
        <main>
          {/* view curent Authenticated user profile Photo */}
          <img src={currentUser.photoURL} alt="" />
          <p>{currentUser.displayName}</p>
          <button onClick={handleSignOut}>Logout</button>
        </main>
      </NavbarContainer>
    </NavbarBody>
  );
};

export default Navbar;
