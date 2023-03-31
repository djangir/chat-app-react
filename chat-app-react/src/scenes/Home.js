import { ChatBox } from "components/common";
import ChatBody from "components/common/ChatBody";
import NavBar from "components/common/NavBar";
import PhofileNavBar from "components/common/PhofileNavBar";
import React from "react";
import { useParams } from "react-router-dom";

function Home() {
  const renderNavBar = () => {
    return (
      <div>
        <PhofileNavBar />
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
