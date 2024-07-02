import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [targets, setTrgets] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/progress/user-progress/${currentUser._id}`
        );
        console.log("new data", data)
        if (data.length > 0) {
          setFormState(data[0]);
        }
      } catch (error) {
        console.log("Error fetching targets data:", error);
      }
    };

    if (currentUser && currentUser._id) {
      fetchTargets();
    }
  }, [currentUser]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: parseFloat(value) || 0,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate("/progress");
  };

  return (
    <div>
      <h1>Update Progress</h1>
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

        <button type="submit">Update Progress</button>
      </form>
    </div>
  );
};

export default UpdateProgressPage;
