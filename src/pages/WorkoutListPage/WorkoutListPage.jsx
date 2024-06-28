import React from "react";
import { Link } from "react-router-dom";
import WorkoutDetailsPage from "../WorkoutDetailsPage/WorkoutDetailsPage";

const WorkoutListPage = () => {
  return (
    <div className="workout-list">
      <h1>Choose activities that interest</h1>
      <div>
        {workouts.map((oneWorkout) => {
          <Link to={`/workouts/${oneWorkout.id}`}>
            <WorkoutDetailsPage workout={oneWorkout} />
          </Link>;
        })}
      </div>
    </div>
  );
};

export default WorkoutListPage;
