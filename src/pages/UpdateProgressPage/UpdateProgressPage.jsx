import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import "./UpdateProgressPage.css";
import { AuthContext } from "../../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateProgressPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    water: "",
    workout: "",
    sleep: "",
  });

  const [message, setMessage] = useState("");

  const units = {
    water: "ml",
    workout: "hours",
    sleep: "hours",
  };

  const limits = {
    water: 5000,
    workout: 24,
    sleep: 24,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formState) {
      if (formState[key] > limits[key]) {
        setMessage(
          `The value for ${key} exceeds the limit of ${limits[key]} ${units[key]}.`
        );
        return;
      }
    }

    try {
      const response = await axios.post(
        `${API_URL}/updateProgress/create-progress`,
        {
          ...formState,
          userId: currentUser._id,
        }
      );
      setFormState(response.data);
      setMessage("Progress updated successfully!");
      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Error setting progress:", error);
      setMessage("Error setting progress.");
    }

    navigate("/progress");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: parseFloat(value) || "",
    }));
    setMessage("");
  };

  const handleResetProgress = async () => {
    try {
      const response = await axios.post(`${API_URL}/updateProgress/create-progress`, {
        userId: currentUser._id,
      });
      setMessage("Progress reset successfully!");
      console.log("Reset response:", response.data);
      setFormState({
        water: "",
        workout: "",
        sleep: "",
      });
    } catch (error) {
      console.error("Error resetting progress:", error);
      setMessage("Error resetting progress.");
    }
  };

  return (
    <div className="update-progress-page">
      <h1>Update Progress</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        {Object.keys(formState).map((key) => (
          <InputGroup className="mb-3" key={key}>
            <InputGroup.Text>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </InputGroup.Text>
            <Form.Control
              type="number"
              name={key}
              value={formState[key]}
              onChange={handleChange}
              placeholder={`Enter ${key} (0 to ${limits[key]} ${units[key]})`}
            />
            <InputGroup.Text>{units[key]}</InputGroup.Text>
          </InputGroup>
        ))}

        <Button type="submit">Update Progress</Button>
        <Button variant="danger" onClick={handleResetProgress} className="ml-2">
          Reset Progress
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProgressPage;
