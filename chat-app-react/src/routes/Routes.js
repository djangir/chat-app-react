import Login from "components/login/Login";
import { getAuth } from "firebase/auth";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "scenes";
import { ChatListScene } from "scenes";

function Routes() {
  const auth = getAuth();
  const { currentUser } = auth;
  let islogin = currentUser || localStorage.getItem("islogin");

  let returnRoutes = () => {
    if (islogin) {
      return [
        {
          path: "/",
          element: <ChatListScene />,
        },
        {
          path: "/:user/:phone",
          element: <Home />,
        },
      ];
    } else {
      return [
        {
          path: "/",
          element: <Login />,
        },
      ];
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
    ...returnRoutes(),
  ]);
}

export default Routes;
