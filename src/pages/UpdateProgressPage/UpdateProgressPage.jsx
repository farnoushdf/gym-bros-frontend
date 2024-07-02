import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateProgressPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [water, setWater] = useState('');
  const [weight, setWeight] = useState('');
  const [workout, setWorkout] = useState('');
  const [previousProgress, setPreviousProgress] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/progress/user-progress/${currentUser._id}`
        );
        if (data.length > 0) {
          const latestProgress = data[0];
          setPreviousProgress(latestProgress); 
          setWater(latestProgress.water.toString());
          setWeight(latestProgress.weight.toString());
          setWorkout(latestProgress.workout.toString());
        }
      } catch (error) {
        console.log("Error fetching progress data:", error);
      }
    };

    if (currentUser && currentUser._id) {
      fetchProgress();
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProgress = {
      water: Number(water),
      weight: Number(weight),
      workout: Number(workout),
    };

    console.log("Updated progress:", updatedProgress);
    navigate("/progress")

    // try {
    //   setIsDisabled(true);
    //   await axios.patch(`${API_URL}/progress/update-progress`, {
    //     ...updatedProgress,
    //     userId: currentUser._id,
    //   });
    //
    //   setPreviousProgress(updatedProgress);
    //
    //   console.log("Update success. Updated progress:", updatedProgress);
    //   navigate("/progress");
    // } catch (error) {
    //   setErrorMessage("Error updating progress");
    //   console.error("Error updating progress:", error);
    // } finally {
    //   setIsDisabled(false);
    // }
  };

  return (
    <div>
      <h1>Update Your Progress</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Water:</label>
          <input
            type="text"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            disabled={isDisabled}
            placeholder="Enter water intake"
          />
          <span className="input-unit">litres(s)</span>
          {previousProgress && (
            <span className="previous-progress">
              Previous: {previousProgress.water} litres
            </span>
          )}
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            disabled={isDisabled}
            placeholder="Enter weight"
          />
          <span className="input-unit">kg</span>
          {previousProgress && (
            <span className="previous-progress">
              Previous: {previousProgress.weight} kg
            </span>
          )}
        </div>
        <div>
          <label>Workout:</label>
          <input
            type="text"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            disabled={isDisabled}
            placeholder="Enter workout duration"
          />
          <span className="input-unit">minutes</span>
          {previousProgress && (
            <span className="previous-progress">
              Previous: {previousProgress.workout} minutes
            </span>
          )}
        </div>
        <div>
          <p className="error-message">{errorMessage && errorMessage}</p>
          <button type="submit" disabled={isDisabled}>
            Update Progress
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProgressPage;
