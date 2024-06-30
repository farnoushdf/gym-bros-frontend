import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import routineService from '../../services/routine.service';

const WorkoutDetailsPage = () => {
  const { id } = useParams(); 
  const [workout, setWorkout] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const fetchedWorkout = await routineService.fetchOneRoutine(id);
        setWorkout(fetchedWorkout);
      } catch (error) {
        console.error('Error fetching workout details:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchWorkoutDetails();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!workout) {
    return <div>Workout not found!</div>; 
  }

  return (
    <div className="workout-details">
      <h1>{workout.name}</h1>
      <p>Workout: {workout.workout}</p>
      <p>Body Part: {workout.bodyPart}</p>
      <p>Total Duration: {workout.totalDuration} minutes</p>
    </div>
  );
};

export default WorkoutDetailsPage;
