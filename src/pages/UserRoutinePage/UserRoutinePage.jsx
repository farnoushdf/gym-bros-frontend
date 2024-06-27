import React from 'react'
import { AuthContext } from '../../context/auth.context';

const UserRoutinePage = () => {
    const { currentUser, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const logout = () => {
      handleLogout();
      navigate('/login');
    };
  
    return (
      <div>
        <h1>Profile Page</h1>
        {currentUser ? (
          <div>
            <h2>Welcome, {currentUser.name}</h2>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>Please log in to see your profile.</p>
        )}
      </div>
    );
  };

export default UserRoutinePage