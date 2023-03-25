import Login from "components/login/Login";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "scenes";

function routes() {
  let islogin = localStorage.getItem("islogin");
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

export default routes;
