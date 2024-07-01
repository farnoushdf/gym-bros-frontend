import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routineService from '../../services/routine.service';
import EditRoutine from '../../components/EditRoutine/EditRoutine';

const WorkoutListPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await routineService.fetchAllRoutines();
        setWorkouts(response);
      } catch (error) {
        setErrorMessage('Error fetching workouts');
        console.log(error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await routineService.deleteOneRoutine(id);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error('Error deleting routine:', error);
      setErrorMessage('Error deleting routine');
    }
  };

  return (
    <div className="workout-list">
      <h1>Choose activities that interest you</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        {workouts.map((oneWorkout) => (
          <div key={oneWorkout._id}>
            <Link to={`/workouts/${oneWorkout._id}`}>
              <div className="workout-item">
                <h2>{oneWorkout.name}</h2>
                <p>{oneWorkout.description}</p>
              </div>
            </Link>
            <button onClick={() => handleDelete(oneWorkout._id)}>Delete</button>
            <Link to={`/workouts/${oneWorkout._id}/edit`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutListPage;
