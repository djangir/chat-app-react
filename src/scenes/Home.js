import { ChatBox } from "components/common";
import ChatBody from "components/common/ChatBody";
import NavBar from "components/common/NavBar";
import React from "react";

function Home() {
  const renderNavBar = () => {
    return (
      <div>
        <NavBar />
      </div>
    );
  };

  const renderChatBody = () => {
    return (
      <div className="chatBody">
        <ChatBody />
      </div>
    );
  };

  const renderChatInput = () => {
    return (
      <div>
        <ChatBox />
      </div>
    );
  };

  return (
    <div className="homebody d-flex flex-column">
      {renderNavBar()}
      {renderChatBody()}
      {renderChatInput()}
    </div>
  );
}

export default Home;
