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
    workout: 0,
    sleep: 0,
  });

  const [progress, setProgress] = useState({
    water: 0,
    workout: 0,
    sleep: 0,
  });

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/progress/user-progress/${currentUser._id}`
        );
        if (data.length > 0) {
          setTargets(data[data.length - 1]);
        }
      } catch (error) {
        console.log("Error fetching targets data:", error);
      }
    };

    const fetchProgress = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/updateProgress/user-progress/${currentUser._id}`
        );
        if (data.length > 0) {
          setProgress(data[data.length - 1]);
        }
      } catch (error) {
        console.log("Error fetching progress data:", error);
      }
    };

    if (currentUser) {
      fetchTargets();
      fetchProgress();
    }
  }, [currentUser]);

  const units = {
    water: "ml",
    workout: "hours",
    sleep: "hours",
  };

  const categories = ["Water", "Workout", "Sleep"];

  const calculatePercentage = (category) => {
    const value = progress[category.toLowerCase()];
    const target = targets[category.toLowerCase()];

    if (value && target) {
      return (value / target) * 100;
    } else {
      return 0;
    }
  };

  const handleResetTargets = async () => {
    try {
      const response = await axios.post(`${API_URL}/progress/create-progress`, {
        userId: currentUser._id,
      });
      setTargets({
        water: 0,
        workout: 0,
        sleep: 0,
      });
      console.log("Reset targets response:", response.data);
    } catch (error) {
      console.error("Error resetting targets:", error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const hasTarget = Object.values(targets).some((target) => target > 0);
  const hasProgress = Object.values(progress).some((value) => value > 0);

  return (
    <div className="progress">
      <h4>You can set your target and progress here to check your progress</h4>
      <div className="progress-display">
        {categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <CircularProgressbar
              value={calculatePercentage(category)}
              text={`${Math.round(calculatePercentage(category))}%`}
              styles={buildStyles({
                textColor: "#c07c1e",
                pathColor: "#c07c1e",
                trailColor: "#dfe1e6",
              })}
            />
            <p className="target-units">
              Target: {targets[category.toLowerCase()]}{" "}
              {units[category.toLowerCase()]}
            </p>
          </div>
        ))}
      </div>
      {/* Always display all buttons when user is authenticated */}
      <div className="buttons-container">
        <Link to="/set-targets">
          <button>Set Your Targets</button>
        </Link>
        {hasTarget && (
          <button onClick={handleResetTargets}>Reset Targets</button>
        )}
        <Link to="/update-progress">
          <button>Update Your Progress</button>
        </Link>
      </div>
    </div>
  );
};

export default ProgressPage;