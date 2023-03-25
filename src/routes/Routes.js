import Login from "components/login/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "scenes";

function Routes() {
  const auth = getAuth();
  const { currentUser } = auth;
  let islogin = currentUser || localStorage.getItem("islogin");

  let returnRoutes = () => {
    if (islogin) {
      return {
        path: "/",
        element: <Home />,
      };
    } else {
      return {
        path: "/",
        element: <Login />,
      };
    }
  };

  return createBrowserRouter([
    {
      path: "*",
      element: (
        <div
          className="p-5 text-center"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go to Login Page
        </div>
      ),
    },
    returnRoutes(),
  ]);
}

export default Routes;
