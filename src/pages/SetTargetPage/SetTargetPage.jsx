import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

const SetTargetPage = ({ setTargets }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: parseFloat(value) || 0 });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setTargets(formState);
    console.log('formState ', formState);


      try {
      const response = await axios.post(`${API_URL}/progress/create-progress`, formState);
      console.log('Post response:', response.data);
    } catch (error) {
      console.error('Error posting targets:', error);
    }


    navigate('/update-progress');
  };
  return (
    <div>
      <h1>Set Your Targets</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formState).map((key) => (
          <div key={key}>
            <label>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type="number"
                name={key}
                value={formState[key]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
          <button type="submit">Set Targets</button>
      </form>
    </div>
  );
};

export default SetTargetPage;
