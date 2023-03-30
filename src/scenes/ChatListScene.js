import React, { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, getFirestore, where } from "firebase/firestore";
import NavBar from "components/common/NavBar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "components/redux/slice";

function ChatListScene() {
  const db = getFirestore();
  const auth = getAuth();
  let dispatch = useDispatch();
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
        dispatch(addUser(item));
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

  const renderGroup = () => {
    return (
      <div className="pointer d-flex justify-content-end">
        <div className="p-2 btn btn-warning mx-3 mt-3">create group</div>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      {renderGroup()}
      {returnUsers()}
    </div>
  );
}

export default ChatListScene;
