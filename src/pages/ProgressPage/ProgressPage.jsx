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
    sleep: 0,
    walk: 0,
  });

  const [progress, setProgress] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

 useEffect(() => {
   if (currentUser && currentUser._id) {
     const fetchTargets = async () => {
       try {
         const { data } = await axios.get(
           `${API_URL}/progress/user-progress/${currentUser._id}`
         );
         if (data.length > 0) {
           setTargets(data[0]);
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

     fetchTargets();
     fetchProgress();
   }
 }, [currentUser]);

   const units = {
     water: "ml",
     weight: "kg",
     workout: "hours",
     sleep: "hours",
     walk: "meters",
   };
 
 const categories = ["Water", "Weight", "Workout", "Sleep", "Walk"];
 
  const calculatePercentage = (category) => {
    const value = progress[category.toLowerCase()];
    const target = targets[category.toLowerCase()];
    console.log("target:", target);
    console.log("value:", value)

    if (category === "Weight") {
      return target > 0 ? (target / value) * 100 : 0;
    } else {
      return target > 0 ? (value / target) * 100 : 0;
    }
  };
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // const hasTarget = Object.keys(targets).length > 0;
  const hasTarget = Object.values(targets).some((target) => target > 0);

  return (
    <>
      <div className="progress">
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
        {!hasTarget && (
          <Link to="/set-targets">
            <button>Set your Target</button>
          </Link>
        )}
        {hasTarget && (
          <Link to="/update-progress">
            <button>Update Your Progress</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ProgressPage;
