import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mealService from '../../services/meal.service';

const YourMealDetailsPage = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await mealService.fetchOneMeal(id);
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
        <div>
            <h2>{meal.name}</h2>
            <p>Description: {meal.description}</p>
            <p>Calories: {meal.calories}</p>
            <p>Ingredients: {meal.ingredients}</p>
            <p>Added on: {new Date(meal.date).toLocaleDateString()}</p>        
        </div>
    );
};

export default YourMealDetailsPage;