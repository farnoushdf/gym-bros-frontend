import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routineService from "../../services/routine.service";

const WorkoutListPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await routineService.fetchAllRoutines();
        setWorkouts(response);
      } catch (error) {
        setErrorMessage("Error fetching workouts");
        console.log(error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="workout-list">
      <h1>Choose activities that interest you</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        {workouts.map((oneWorkout) => (
          <Link key={oneWorkout._id} to={`/workouts/${oneWorkout._id}`}>
            <div className="workout-item">
              <h2>{oneWorkout.name}</h2>
              <p>{oneWorkout.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkoutListPage;
