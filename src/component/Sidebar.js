import React from "react";
// import styling for search using styled-components
import { SidebarContainer } from "../css/SideBarCss";
// navBar component import
import Navbar from "./Navbar";
// mport search bar component
import Search from "./Search";
// import chat component
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Navbar />
      <Search />
      <Chats />
    </SidebarContainer>
  );
};

export default Sidebar;
