import React, { useEffect } from "react";
import routes from "routes/Routes";
import { RouterProvider } from "react-router-dom";
import firebaseConfig from "./firebase/FirebaseConf";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const App = () => {
  initializeApp(firebaseConfig);
  return (
    <div>
      <RouterProvider router={routes()} />
      <div id="recaptcha-container" />
    </div>
  );
};

export default App;
