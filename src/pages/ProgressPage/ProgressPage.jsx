import React, { useEffect, useState, useContext } from "react";
import "./ProgressPage.css";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProgressPage = () => {
  const { currentUser, progress } = useContext(AuthContext);
  const [targets, setTargets] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

  const [updateProgress, setUpdateProgress] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

  useEffect(() => {
    if (currentUser && currentUser._id) {
      const fetchTargetsAndProgress = async () => {
        try {
          const { userData } = await axios.get(
            `${API_URL}/progress/user-progress/${currentUser._id}`
          );
          if (userData.length > 0) {
            setTargets(userData[0]);
          }

           const { updateData } = await axios.get(
             `${API_URL}/progress/update-progress/${progress._id}`
           );
           if (updateData.length > 0) {
             setUpdateProgress(updateData[0]);
           }


          console.log("data-progress", data);
        } catch (error) {
          console.log("Error fetching targets and progress data:", error);
        }
      };

      fetchTargetsAndProgress();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const categories = ["Water", "Weight", "Workout", "Sleep", "Walk"];

  const calculatePercentage = (category) => {
    const value = updateProgress[category.toLowerCase()];
    const target = targets[category.toLowerCase()];
    if (category === "Weight") {
      return target > 0 ? (target / value) * 100 : 0;
    } else {
      return target > 0 ? (value / target) * 100 : 0;
    }
  };

  const hasTargets = Object.values(targets).some((target) => target > 0);

  return (
    <>
      <div className="welcome-message">
        <h1>Welcome, {currentUser.username}!</h1>
        <p>Feeling motivated? Keep track of your progress and stay consistent!</p>
        <Link to="/set-targets">
          <button>
            {hasTargets ? "Update Your Targets" : "Set Your Targets"}
          </button>
        </Link>
      </div>

      <div className="progress-display">
        {categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <CircularProgressbar
              value={calculatePercentage(category)}
              text={`${Math.round(calculatePercentage(category))}%`}
              styles={buildStyles({
                textColor: "#172b4d",
                pathColor: "#0052cc",
                trailColor: "#dfe1e6",
              })}
            />
          </div>
        ))}
      </div>

      <Link to="/update-progress">
        <button>Update Your Progress</button>
      </Link>
    </>
  );
};

export default ProgressPage;
