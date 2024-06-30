import React, { useCallback } from "react";
import "./ProgressPage.css";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressPage = ({ targets, progress }) => {
  const categories = ["Water", "Weight", "Workout", "Sleep", "Walk"];
  // const calculatePercentage = (value, target) => (target > 0 ? (value / target) * 100 : 0);
  const calculatePercentage = (category) => {
    const value = progress[category.toLowerCase()];
    const target = targets[category.toLowerCase()];
    const result = value / target;
    return target > 0 ? result * 100 : 0;
  };

  return (
    <>
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
      <Link to="/set-targets">
        <button>Set your Target</button>
      </Link>
    </>
  );
};

export default ProgressPage;
