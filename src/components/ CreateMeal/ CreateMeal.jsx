import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_MEAL_FORM_VALUES = {
  mealName: '',
  description: '',
  calories: 0,
  ingredients: '',
};

const CreateMeal = ({ setOpen }) => {
  const { user } = useContext(AuthContext);
  const [meal, setMeal] = useState({ ...DEFAULT_MEAL_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMeal({ ...DEFAULT_MEAL_FORM_VALUES });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      console.error('User is not defined or does not have an _id');
      return;
    }
    const requestBody = {
      ...meal,
      ingredients: meal.ingredients.split(',').map((ingredient) => ingredient.trim()),
      author: user._id,
    };

    setSubmitting(true);

    axios
      .post(`${API_URL}/meals`, requestBody)
      .then(() => {
        setMeal({ ...DEFAULT_MEAL_FORM_VALUES });
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
        <div>Add Meal</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Meal Name:</label>
            <input
              type="text"
              name="mealName"
              value={meal.mealName}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Enter meal name"
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={meal.description}
              onChange={handleChange}
              disabled={submitting}
              rows="4"
              placeholder="Add meal details"
            />
          </div>

          <div>
            <label>Calories:</label>
            <input
              type="number"
              name="calories"
              value={meal.calories}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Enter calories"
            />
          </div>

          <div>
            <label>Ingredients:</label>
            <input
              type="text"
              name="ingredients"
              value={meal.ingredients}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Enter ingredients, separated by commas"
            />
          </div>

          <div>
            <button type="submit" disabled={submitting}>
              Save
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
