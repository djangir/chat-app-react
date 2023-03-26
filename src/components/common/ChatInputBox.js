import React, { useState } from "react";
import InputBox from "./InputBox";

function ChatInputBox() {
  const [message, setmessage] = useState("");

  let data = {
    placeholder: "Message",
    type: "text",
    className: "form-control",
    value: message,
    onChange: (evt) => {
      setmessage(evt.target.value);
    },
  };

  return (
    <div className="chatBox">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(message);
        }}
      >
        <div className="d-flex messageBox">
          <div className="w-100">
            <InputBox input={data} />
          </div>
          <div className="pb-3 pointer">Send</div>
        </div>
      </form>
    </div>
  );
}

export default ChatInputBox;
