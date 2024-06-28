import React, { useState } from "react";
import { Link } from "react-router-dom";

const SetTargetPage = ({ setTargets }) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setTargets(formState);
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
        <Link to="/progress">
          <button type="submit">Set Targets</button>
        </Link>
      </form>
    </div>
  );
};

export default SetTargetPage;
