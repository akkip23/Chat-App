// import react hooks from react packages
import { createContext, useContext, useReducer } from "react";
// import on Auth changed from firebase auth
import { AuthContext } from "./AuthContext";

// create context hook
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  // chat ruducer function on case change
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid > action.payload?.uid
              ? currentUser?.uid + action.payload?.uid
              : action.payload?.uid + currentUser?.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // chat content to be include in the main index page to be used everywhere
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
