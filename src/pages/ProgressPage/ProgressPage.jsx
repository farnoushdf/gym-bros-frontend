import React, { useEffect, useState, useContext } from "react";
import "./ProgressPage.css";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProgressPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [targets, setTargets] = useState({
    water: 0,
    weight: 0,
    workout: 0,
  });

  const [progress, setProgress] = useState({
    water: 0,
    weight: 0,
    workout: 0,
  });

  useEffect(() => {
    if (currentUser && currentUser._id) {
      const fetchTargetsAndProgress = async () => {
        try {
          const { data } = await axios.get(`${API_URL}/progress/user-progress/${currentUser._id}`);
          if (data.length > 0) {
            const { water, weight, workout } = data[0];
            setTargets({
              water: water || 0,
              weight: weight || 0,
              workout: workout || 0,
            });
            setProgress({
              water: water || 0,
              weight: weight || 0,
              workout: workout || 0,
            });
          }
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

  const categories = ["Water", "Weight", "Workout"];

  const calculatePercentage = (category) => {
    const value = progress[category.toLowerCase()];
    const target = targets[category.toLowerCase()];
    const numericValue = Number(value);
    const numericTarget = Number(target);

    if (isNaN(numericValue) || isNaN(numericTarget) || numericTarget <= 0) {
      return 0;
    }

    switch (category) {
      case "Weight":
        return numericValue >= numericTarget ? 100 : (numericValue / numericTarget) * 100;
      default:
        return (numericValue / numericTarget) * 100;
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
