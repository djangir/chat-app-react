import React, { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, getFirestore, where, and } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ChatBody() {
  const db = getFirestore();
  const { user, phone } = useParams();
  const [chatData, setChatData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const auth = getAuth();

  onAuthStateChanged(auth, () => {
    setCurrentUser(auth.currentUser);
  });

  useEffect(() => {
    if (currentUser && currentUser?.uid) {
      let uid = currentUser.uid;

      const q = query(
        collection(db, "messages"),
        where("user_id", "in", [uid, user]),
        where("to_user_id", "in", [uid, user]),
        orderBy("createdAt"),
        limit(100)
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let messages = [];
        QuerySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setChatData(messages);
      });
      return () => unsubscribe;
    }
  }, [currentUser, user]);

  const renderMessages = () => {
    return chatData.map((item, index) => {
      let isRight = item.user_id == currentUser.uid ? "end-message" : "";
      let messageStyle = item.user_id == currentUser.uid ? "right-message-text" : "left-message-text";

      return (
        <div key={index} className={`${isRight} m-2`}>
          {/* <div> */}
          {/* <div className="text-sm">{item.user_name || "user"}</div> */}
          <div className={`btn btn-secondary ${messageStyle}`}>{item.message}</div>
          {/* </div> */}
        </div>
      );
    });
  };

  return <div className="messagebox">{renderMessages()}</div>;
}

export default ChatBody;
