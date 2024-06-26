import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Adjust the path as per your project structure

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  const authenticateUser = async () => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    try {
      const { data } = await authService.verify();
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
        authService,
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
