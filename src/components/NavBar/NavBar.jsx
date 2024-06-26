import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';

const Navbar = () => {
  const { handleLogout, currentUser } = useContext(AuthContext);
  const isLandingPage = window.location.pathname === '/';

  return (
    !isLandingPage && (
      <nav className="navbar">
        <Link to="/home">
          <button>Home</button>
        </Link>

        {currentUser ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/profile">
              <button>Your Routine</button>
            </Link>

          </>
        )}
      </nav>
    )
  );
};

export default Navbar;

