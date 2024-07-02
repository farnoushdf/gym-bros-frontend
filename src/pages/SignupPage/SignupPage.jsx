import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      await axios.post("http://localhost:5005/auth/signup", formData, config);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        setErrorMessage("An error occurred during sign up. Please try again.");
      }
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Name:</label>
        <input type="text" name="username" value={username} onChange={handleUsernameChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmailChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} required />

        <label>User Image:</label>
        <input type="file" name="image" />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default SignupPage;
