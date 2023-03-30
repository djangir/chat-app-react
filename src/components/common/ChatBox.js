import React, { useEffect, useState } from "react";
import "components/assets/style/chatbox.scss";
import ChatInputBox from "./ChatInputBox";
import {
  addDoc,
  getFirestore,
  collection,
  serverTimestamp,
  query,
  orderBy,
  where,
  onSnapshot,
  and,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ChatBox() {
  const db = getFirestore();
  const auth = getAuth();
  let { userData } = useSelector((state) => state);

  const { user, phone } = useParams();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "loginUsers"), and(where("phoneNumber", "==", phone), where("uid", "==", user)));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsersData(users);
    });
    return () => unsubscribe;
  }, []);

  const handleChange = async (obj) => {
    const { uid, phoneNumber } = auth.currentUser;
    let { message } = obj;

    await addDoc(collection(db, "messages"), {
      message: message,
      user_id: uid,
      to_user_id: usersData[0].uid,
      createdAt: serverTimestamp(),
      isGroup: false,
      phoneNumber,
      user_name: userData.user_name,
    });
  };

  return (
    <div className="chatinputBox">
      <ChatInputBox onclick={handleChange} />
    </div>
  );
}

export default ChatBox;
