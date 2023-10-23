import React from "react";
// import sidebar component
import Sidebar from "../component/Sidebar";
// import chat component
import Chat from "../component/Chat";
// used styled-component to style elements import styles for Home Component
import { HomeBody, BodyContainer } from "../css/HomeCss";

const Home = () => {
  return (
    // include sidebar, chat components
    <HomeBody>
      <BodyContainer>
        <Sidebar />
        <Chat />
      </BodyContainer>
    </HomeBody>
  );
};

export default Home;
