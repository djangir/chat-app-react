import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  getFirestore,
  where,
} from "firebase/firestore";
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
    const q = query(
      collection(db, "loginUsers"),
      orderBy("createdAt"),
      limit(100)
    );
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
          className="m-2 pointer"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "gray",
              margin: "5px 10px 5px 10px",
            }}
          ></div>
          <div>{item.phoneNumber}</div>
        </div>
      );
    });
  };

  const renderGroup = () => {
    return (
      <div className="pointer d-flex justify-content-between">
        <div className="p-2 btn btn-warning mx-lg-5 mx-4 mt-3">Chats</div>
        <div className="p-2 btn btn-warning mx-lg-5 mx-4 mt-3">Calls</div>
        <div className="p-2 btn btn-warning mx-lg-5 mx-4 mt-3">
          Create group
        </div>
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
