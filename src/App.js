import React from "react";
import Routes from "routes/Routes";
import { RouterProvider } from "react-router-dom";
import firebaseConfig from "./firebase/FirebaseConf";
import { initializeApp } from "firebase/app";
import NavBar from "components/common/NavBar";

const App = () => {
  initializeApp(firebaseConfig);
  return (
    <div>
      <RouterProvider router={Routes()} />
      <div id="recaptcha-container" />
    </div>
  );
};

export default App;
