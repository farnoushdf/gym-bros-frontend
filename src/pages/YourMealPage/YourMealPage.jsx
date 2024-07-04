import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './YourMealPage.css';

const API_URL = import.meta.env.VITE_API_URL;

const YourMealPage = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMealId, setEditMealId] = useState(null);
    const [editedMeal, setEditedMeal] = useState({
        name: '', 
        description: '',
        ingredients: []
    });

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`${API_URL}/meals/all-meals`);
                if (response.status === 200) {
                    setMeals(response.data);
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

    const handleDeleteMeal = async (mealId) => {
        try {
            await axios.delete(`${API_URL}/meals/delete-meal/${mealId}`);
            setMeals(meals.filter(meal => meal._id !== mealId));
        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    };

    const handleEditMeal = (mealId) => {
        setEditMealId(mealId);
        const mealToEdit = meals.find(meal => meal._id === mealId);
        setEditedMeal({
            name: mealToEdit.name,
            description: mealToEdit.description,
            ingredients: mealToEdit.ingredients
        });
    };

    const handleCancelEditMeal = () => {
        setEditMealId(null);
        setEditedMeal({
            name: '',
            description: '',
            ingredients: []
        });
    };

    const handleSaveEditMeal = async () => {
        try {
            const response = await axios.patch(`${API_URL}/meals/update-meal/${editMealId}`, editedMeal);
            const updatedMeal = response.data;
            const updatedMeals = meals.map(meal => (meal._id === updatedMeal._id ? updatedMeal : meal));
            setMeals(updatedMeals);
            setEditMealId(null);
            setEditedMeal({
                name: '',
                description: '',
                ingredients: []
            });
        } catch (error) {
            console.error("Error updating meal:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMeal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDropdownChange = (e) => {
        const { value } = e.target;
        setEditedMeal(prevState => ({
            ...prevState,
            name: value
        }));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Oops! Something went wrong. Please try again later!</p>;
    }



    return (
        <div className="meal-page">
            <h1 className="page-title">What Have You Been Eating So Far?</h1>
            <div className="meal-cards">
                {meals.map(meal => (
                    <div className="meal-card" key={meal._id}>
                        {editMealId === meal._id ? (
                            <div className="edit-meal-form">
                                <h2>Edit Meal</h2>
                                <label htmlFor="name">Meal Name</label>
                                <select id="name" name="name" value={editedMeal.name} onChange={handleDropdownChange}>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" name="description" value={editedMeal.description || ''} onChange={handleInputChange} placeholder="Description" />
                                <label htmlFor="ingredients">Ingredients</label>
                                <input type="text" id="ingredients" name="ingredients" value={editedMeal.ingredients.join(', ') || ''} onChange={handleInputChange} placeholder="Ingredients (comma separated)" />
                                <button className="btn btn-save" onClick={handleSaveEditMeal}>Save</button>
                                <button className="btn btn-cancel" onClick={handleCancelEditMeal}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <h2 className="meal-name">{meal.name}</h2>
                                <p><strong>Description:</strong> {meal.description}</p>
                                <p><strong>Ingredients:</strong> {meal.ingredients.join(', ')}</p>
                                <p><strong>Date Added:</strong> {new Date(meal.date).toLocaleDateString()}</p>
                                <div className="button-container">
                                    <button className="btn btn-edit" onClick={() => handleEditMeal(meal._id)}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YourMealPage;