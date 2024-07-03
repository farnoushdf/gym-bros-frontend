import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';
import logo from "../../assets/gym-icon.png";
import "./Navbar.css";

const Navbar = () => {
  const { handleLogout, currentUser, alertMessage } = useContext(AuthContext);
  const isLandingPage = window.location.pathname === '/';

  return (
    !isLandingPage && (
      <nav className="navbar">
        <Link to="/home">
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo"
            style={{ width: "50px", height: "auto" }}
          />
        </Link>

        <h1>GymBros</h1>

        {alertMessage && (
          <div className="alert">
            <p>{alertMessage}</p>
          </div>
        )}

        {currentUser ? (
          <>
            <div className="username-logout">
                {currentUser.userImage ? (
                  <img
                    src={currentUser.userImage}
                    alt="Profile"
                    className="profile-image"
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  />
                ) : (
                  <div className="avatar">{currentUser.username}</div>
                )}
              {"/"}
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="username-logout">
              <Link to="/signup" className="auth-buttons">
                <button>Sign Up</button>
              </Link>
              <Link to="/login" className="auth-buttons">
                <button>Login</button>
              </Link>
            </div>
          </>
        )}
      </nav>
    )
  );
};

export default Navbar;
