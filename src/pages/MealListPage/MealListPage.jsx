import React, { useState, useEffect } from "react";
import "./MealListPage.css";
import { Link } from "react-router-dom";
import "./MealListPage.css"

const API_URL = import.meta.env.VITE_API_URL;

const MealListPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${API_URL}/meals/all-meals`);
        if (response.ok) {
          const json = await response.json();
          setMeals(json);
        } else {
          setError(`Failed to fetch meals: ${response.status}`);
        }
      } catch (error) {
        setError(`Error fetching meals: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="meal-list-page">
      <h1>Meal List</h1>
      <div className="meal-list">
        {meals.map((meal) => (
          <Link to={`/meals/${meal._id}`} key={meal._id} className="meal-item">
            <div>
              <h2>{meal.name}</h2>
              {meal.image && <img src={meal.image} alt={meal.name} />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealListPage;
