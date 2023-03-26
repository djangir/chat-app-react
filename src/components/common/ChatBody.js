import React, { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, getFirestore, where } from "firebase/firestore";

function ChatBody() {
  const db = getFirestore();
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setChatData(messages);
    });
    return () => unsubscribe;
  }, []);

  const renderMessages = () => {
    return chatData.map((item, index) => {
      return <div key={index}>{item.message}</div>;
    });
  };

  return <div className="messagebox">{renderMessages()}</div>;
}

export default ChatBody;
