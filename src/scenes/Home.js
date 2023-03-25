import { getAuth, signOut } from "firebase/auth";
import React from "react";

function Home() {
  let auth = getAuth();
  return (
    <div>
      Home
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          signOut(auth);
          window.location.href = "/";
          localStorage.clear();
        }}
      >
        Log out
      </div>
    </div>
  );
}

export default Home;
