import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const SetTargetPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [water, setWater] = useState('');
  const [weight, setWeight] = useState('');
  const [workout, setWorkout] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  // useEffect(() => {
  //   const fetchTargets = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${API_URL}/progress/user-progress/${currentUser._id}`
  //       );
  //       if (data.length > 0) {
  //         // setFormState(data[0]);
  //         setData(data[0]);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching targets data:", error);
  //     }
  //     console.log("data ", data);
  //   };
  //   if (currentUser && currentUser._id) {
  //     fetchTargets();
  //   }
  // }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsDisabled(true);
      const response = await axios.post(`${API_URL}/progress/create-progress`, {
        ...newTargets,
        userId: currentUser._id,
      });
      // setFormState(response.data);
      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Error posting targets:", error);
    }

    //   console.log("Post response:", response.data);
    //   navigate("/progress");
    // } catch (error) {
    //   setErrorMessage("Please enter numeric values for targets");
    //   console.error("Error posting targets:", error);
    // } finally {
    //   setIsDisabled(false);
    // }
  };

  return (
    <div>
      <h1>Set Your Targets</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Water:</label>
          <input
            type="text"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            disabled={isDisabled}
            placeholder="Enter water target"
          />
          <span className="input-unit">litres(s)</span>
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            disabled={isDisabled}
            placeholder="Enter weight target"
          />
          <span className="input-unit">kg</span>
        </div>
        <div>
          <label>Workout:</label>
          <input
            type="text"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            disabled={isDisabled}
            placeholder="Enter workout target"
          />
          <span className="input-unit">minutes</span>
        </div>
        <div>
          <p className="error-message">{errorMessage && errorMessage}</p>
          <button type="submit" disabled={isDisabled}>
            Set Targets
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetTargetPage;
