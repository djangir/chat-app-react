import React from "react";
import "components/assets/style/chatbox.scss";
import ChatInputBox from "./ChatInputBox";
import { addDoc, getFirestore, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function ChatBox() {
  const db = getFirestore();
  const auth = getAuth();

  const handleChange = async (obj) => {
    const { uid } = auth.currentUser;
    let { message } = obj;

    await addDoc(collection(db, "messages"), {
      message: message,
      user_id: uid,
      createdAt: serverTimestamp(),
      isGroup: false,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="chatinputBox">
      <ChatInputBox onclick={handleChange} />
    </div>
  );
}

export default ChatBox;
