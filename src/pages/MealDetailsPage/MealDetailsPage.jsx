import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mealService from '../../services/meal.service';

const MealDetailsPage = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await mealService.fetchOneMeal(id);
                setMeal(response.data);
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

    if (!meal) {
        return <p>Meal not found!</p>;
    }

    return (
        <div>
            <h1>{meal.name}</h1>
            <p>Description: {meal.description}</p>
            <p>Calories: {meal.calories}</p>
        </div>
    );
};

export default MealDetailsPage;
