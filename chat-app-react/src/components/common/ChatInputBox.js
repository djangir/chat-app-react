import React, { useState } from "react";
import InputBox from "./InputBox";

function ChatInputBox(props) {
  const { onclick } = props;
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

  const handleSubmit = () => {
    let obj = { message };
    if (message.trim().length) {
      onclick(obj);
    }
    setmessage("");
  };

  return (
    <div className="chatBox">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="d-flex messageBox">
          <div className="w-100">
            <InputBox input={data} />
          </div>
          <div onClick={handleSubmit} className="pb-3 pointer">
            Send
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInputBox;
