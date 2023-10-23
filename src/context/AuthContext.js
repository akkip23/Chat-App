// import react hooks from react packages
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
// import on Auth changed from firebase auth
import { onAuthStateChanged } from "firebase/auth";

// create context hook
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // useState hook to handle current user state
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  // Auth content to be include in the main index page to be used everywhere
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
