import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.scss";

function NavBar() {
  const auth = getAuth();

  const [currentUser, setCurrentUser] = useState(auth?.currentUser);

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  const renderNavBar = useCallback(() => {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" aria-current="page" to={"/"}>
            chatApp
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
            </ul>
            <div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentUser?.phoneNumber}
                </button>
                <ul className="dropdown-menu p-2">
                  <li>
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }, [currentUser]);

  return <div>{renderNavBar()}</div>;
}

export default NavBar;
