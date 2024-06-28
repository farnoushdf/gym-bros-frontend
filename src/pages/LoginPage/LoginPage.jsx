import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post("http://localhost:5005/auth/login", requestBody)
      .then(({ data }) => {
        console.log("response from the login", data);
        storeToken(data.authToken);
        return authenticateUser();
      })
      .then(() => {
        console.log("Login successful");
        nav("/profile");
      })
      .catch((err) => {
        console.log("Error logging in", err);
        setErrorMessage("Failed to log in. Please check your credentials.");
      });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default LoginPage;
