import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  const storeToken = (token) => { 
    localStorage.setItem("authToken", token);
  }; 

  const authenticateUser = async () => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get("http://localhost:5005/auth/verify", {
        headers: { authorization: `Bearer ${tokenFromLocalStorage}` },
      }); 
      console.log("verify ", data);
      setCurrentUser(data.user);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("error authenticating user", error);
      setCurrentUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    nav("/login");
    setCurrentUser(null);
    setIsLoggedIn(false);
    console.log("user was logged out successfully");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        handleLogout,
        currentUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
