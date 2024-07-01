import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const EditRoutine = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [workout, setWorkout] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [routine, setRoutine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRoutine = async () => {
      try {
        const response = await axios.get(`${API_URL}/routines/one-routine/${id}`);
        const oneRoutine = response.data;
        setRoutine(oneRoutine);
        setName(oneRoutine.name);
        setWorkout(oneRoutine.workout);
        setBodyPart(oneRoutine.bodyPart);
        setTotalDuration(oneRoutine.totalDuration);
      } catch (error) {
        console.log('Error fetching routine:', error);
        setErrorMessage('Error fetching routine');
      }
    };

    getRoutine();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedRoutine = {
      name,
      workout,
      bodyPart,
      totalDuration,
    };

    try {
      const response = await axios.patch(`${API_URL}/routines/update-routine/${id}`, updatedRoutine);
      navigate(`/workouts/${id}`); 
    } catch (error) {
      console.error('Error updating routine:', error);
      setErrorMessage('Error updating routine');
    }
  };

  if (!routine) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Routine</h2>
      <form onSubmit={handleUpdate}>
        <label>Routine Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Workout:</label>
        <input
          type="text"
          value={workout}
          onChange={(e) => setWorkout(e.target.value)}
        />
        <label>Body Part:</label>
        <input
          type="text"
          value={bodyPart}
          onChange={(e) => setBodyPart(e.target.value)}
        />
        <label>Total Duration:</label>
        <input
          type="number"
          value={totalDuration}
          onChange={(e) => setTotalDuration(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Update Routine</button>
      </form>
    </div>
  );
};

export default EditRoutine;
