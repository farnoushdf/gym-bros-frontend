import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <div>
            <h1>Meal List</h1>
            <ul>
                {meals.map(meal => (
                    <p key={meal._id}>
                        <Link to={`/meals/${meal._id}`}>{meal.name}</Link>
                    </p>
                ))}
            </ul>
        </div>
    );
};

export default MealListPage;
