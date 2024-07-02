import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MealDetailsPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/data-meal/one-data-meal${id}`);
        setMeal(response.data);
      } catch (error) {
        setError(`Error fetching meal details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!meal) {
    return <p>Meal not found!</p>;
  }

  return (
    <div className="meal-details">
      <h2>{meal.name}</h2>
      <p>Description: {meal.description}</p>
      <p>Calories: {meal.calories}</p>
      <p>Ingredients: {meal.ingredients.join(", ")}</p>
      <p>Added on: {new Date(meal.date).toLocaleDateString()}</p>
      {meal.image && <img src={meal.image} alt={meal.name} />}
      <button onClick={() => navigate("/your-routines")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

export default MealDetailsPage;
