import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const YourMealPage = () => {
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
                    setError("Oops! Something went wrong. Please try again later!");
                }
            } catch (error) {
                setError("Oops! Something went wrong. Please try again later!");
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
        return <p>"Oops! Something went wrong. Please try again later!"</p>;
    }

    return (
        <div>
            <h1>Meal List</h1>
            <ul>
                {meals.map(meal => (
                    <p key={meal._id}>
                        <Link to={`/your-meals/${meal._id}`}>{meal.name}</Link>
                        <span >
                            Added on {new Date(meal.date).toLocaleDateString()}
                        </span>
                    </p>
                ))}
            </ul>
        </div>
    );
};

export default YourMealPage;