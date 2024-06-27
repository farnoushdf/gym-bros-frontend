import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const nav = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    //const image = e.target.image.files[0];
    //const formData = new FormData();
    //formData.append("image", image);
    //formData.append("username", username);
    //formData.append("email", email);
    //formData.append("password", password);

    const useData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await authService.signup(useData );
      console.log("User signed up:", response.data);
      nav("/login");
    } catch (error) {
      console.error("Error during sign up:", error);
      if (error.response && error.response.data && error.response.data.errorMessage) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Something went wrong with the sign-up process.");
      }
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={username} onChange={handleUsernameChange} />

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />

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
