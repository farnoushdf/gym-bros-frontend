import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_EXERCISE_FORM_VALUES = {
  exerciseName: "",
  description: "",
  duration: 0,
  intensity: "",
};

const CreateExercise = ({ setOpen }) => {
  const { user } = useContext(AuthContext);
  const [exercise, setExercise] = useState({ ...DEFAULT_EXERCISE_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setExercise({ ...DEFAULT_EXERCISE_FORM_VALUES });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...exercise, author: user._id };

    setSubmitting(true);

    axios
      .post(`${API_URL}/exercises`, requestBody)
      .then(() => {
        setExercise({ ...DEFAULT_EXERCISE_FORM_VALUES });
        setSubmitting(false);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div>
        <button onClick={() => setOpen(false)}>X</button>
        <div>Add Exercise</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Exercise Name:</label>
            <input
              type="text"
              name="exerciseName"
              value={exercise.exerciseName}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Enter exercise name"
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={exercise.description}
              onChange={handleChange}
              disabled={submitting}
              rows="4"
              placeholder="Add exercise details"
            />
          </div>

          <div>
            <label>Duration (minutes):</label>
            <input
              type="number"
              name="duration"
              value={exercise.duration}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Enter duration"
            />
          </div>

          <div>
            <label>Intensity:</label>
            <input
              type="text"
              name="intensity"
              value={exercise.intensity}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Enter intensity"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExercise;
