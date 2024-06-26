import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const nav = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
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
        console.log("all good with the login");
        nav("/profile");
      })
      .catch((err) => console.log("error logging in", err));
  };
  return 
  <div className="login-page">
    <h1>Login</h1>
    <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <button type="submit">Login</button>
    </form>

    {errorMessage &&  <p className="error-message">{errorMessage}</p>}
    <Link to={"/signup"}>Sign Up</Link>
  </div>;
};

export default LoginPage;
