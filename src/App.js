import React from "react";
import Routes from "routes/Routes";
import { RouterProvider } from "react-router-dom";
import firebaseConfig from "./firebase/FirebaseConf";
import { initializeApp } from "firebase/app";
import NavBar from "components/common/NavBar";
import { Provider } from "react-redux";
import { store } from "components/redux/store";

const App = () => {
  initializeApp(firebaseConfig);
  return (
    <Provider store={store}>
      <RouterProvider router={Routes()} />
      <div id="recaptcha-container" />
    </Provider>
  );
};

export default App;
