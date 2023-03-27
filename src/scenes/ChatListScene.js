import React, { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, getFirestore, where } from "firebase/firestore";
import NavBar from "components/common/NavBar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function ChatListScene() {
  const db = getFirestore();
  const auth = getAuth();
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "loginUsers"), orderBy("createdAt"), limit(100));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsersData(users);
    });
    return () => unsubscribe;
  }, []);

  const returnUsers = () => {
    return usersData.map((item, index) => {
      if (auth?.currentUser?.phoneNumber == item.phoneNumber) {
        return;
      }
      return (
        <div
          onClick={() => {
            navigate(`/${item.uid}/${item.phoneNumber}`);
          }}
          key={index}
          className="m-2 pointer px-2"
        >
          <div>{item.phoneNumber}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <NavBar />
      {returnUsers()}
    </div>
  );
}

export default ChatListScene;
