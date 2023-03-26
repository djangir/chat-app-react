import ChatInputBox from "components/common/ChatInputBox";
import NavBar from "components/common/NavBar";
import { getAuth, signOut } from "firebase/auth";
import React from "react";

function Home() {
  let auth = getAuth();
  const renderNavBar = () => {
    return (
      <div>
        <NavBar />
      </div>
    );
  };

  const renderChatInput = () => {
    return (
      <div>
        <ChatInputBox />{" "}
      </div>
    );
  };

  return (
    <div>
      {renderNavBar()}
      {renderChatInput()}
    </div>
  );
}

export default Home;
