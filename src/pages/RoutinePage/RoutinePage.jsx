import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const RoutinePage = () => {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await fetch(`${API_URL}/routines/all-routines`);
                if (response.ok) {
                    const json = await response.json();
                    setRoutines(json);
                } else {
                    setError("Oops! Something went wrong. Please try again later!");
                }
            } catch (error) {
                setError("Oops! Something went wrong. Please try again later!");
            } finally {
                setLoading(false);
            }
        };

        fetchRoutines();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>"Oops! Something went wrong. Please try again later!"</p>;
    }

    return (
        <div>
            <h1>Routines List</h1>
            <ul>
                {routines.map(routine => (
                    <p key={routine._id}>
                        <Link to={`/your-routines/${routine._id}`}>{routine.name}</Link>
                    </p>
                ))}
            </ul>
        </div>
    );
};

export default RoutinePage;
