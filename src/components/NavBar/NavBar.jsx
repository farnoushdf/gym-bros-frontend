import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';
import logo from "../../assets/gym-icon.png";
import "./Navbar.css";

const Navbar = () => {
  const { handleLogout, currentUser } = useContext(AuthContext);
  const isLandingPage = window.location.pathname === '/';

   const firstLetter = currentUser
     ? currentUser.username.charAt(0).toUpperCase()
     : "";

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

        {currentUser ? (
          <>
            <div className="username-logout">
              {" "}
              <Link to="/profile" className="username-button">
                <button>{currentUser.username}</button>
              </Link>
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
