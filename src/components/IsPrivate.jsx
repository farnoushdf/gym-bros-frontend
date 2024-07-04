import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <p> Loading...</p>;
  }


  if (!isLoggedIn) {
    navigate("/login");
    return null; 
  }

  return <div>{children}</div>;
}

export default IsPrivate;
