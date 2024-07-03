import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import Modal from '../../components/Modal/Modal'; 
import '../../components/Modal/Modal.css'; 
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();
  

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post("http://localhost:5005/auth/login", requestBody)
      .then(({ data }) => {
        console.log("response from the login", data);
        storedToken(data.authToken);
        return authenticateUser();
      })
      .then(() => {
        console.log("Login successful");
        // nav("/profile");
        nav("/progress");
      })
      .catch((err) => {
        console.log("Error logging in", err);
        setErrorMessage("Failed to log in. Please check your credentials.");
      });
  };

  return (
    <div className="LoginPage">

      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Don't have an account yet? <br /> 
      <Link to={"/signup"}>Sign Up</Link></p>
      <form onSubmit={handleLoginSubmit}>
        <button type="submit" onClick={() => setShowModal(true)}>
          Login
        </button>
      </form>
      <p>
      </p>

    </div>
  );
};

export default LoginPage;
