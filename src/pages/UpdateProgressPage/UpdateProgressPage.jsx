import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap"; 
import "./UpdateProgressPage.css";
import { AuthContext } from "../../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateProgressPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

  const units = {
    water: "ml",
    weight: "kg",
    workout: "hours",
    sleep: "hours",
    walk: "meters",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/updateProgress/create-progress`,
        {
          ...formState,
          userId: currentUser._id,
        }
      );
      setFormState(response.data);
      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Error posting targets:", error);
    }

    navigate("/progress");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="update-progress-page">
      <h1>Update Progress</h1>
      <Form onSubmit={handleSubmit}>
        {Object.keys(formState).map((key) => (
          <InputGroup className="mb-3" key={key}>
            <InputGroup.Text>{key.charAt(0).toUpperCase() + key.slice(1)}</InputGroup.Text>
            <Form.Control
              type="number"
              name={key}
              value={formState[key]}
              onChange={handleChange}
              placeholder={`Enter ${key} (${units[key]})`}
            />
            <InputGroup.Text>{units[key]}</InputGroup.Text>
          </InputGroup>
        ))}

        <Button type="submit">Update Progress</Button>
      </Form>
    </div>
  );
};

export default UpdateProgressPage;
