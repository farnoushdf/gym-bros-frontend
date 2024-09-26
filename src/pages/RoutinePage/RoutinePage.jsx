import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './RoutinePage.css';
import { AuthContext } from "../../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const RoutinePage = () => {
    const { currentUser, isLoading } = useContext(AuthContext);
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRoutineId, setEditRoutineId] = useState(null);
    const [editedRoutine, setEditedRoutine] = useState({
        name: '',
        workout: '',
        bodyPart: '',
        totalDuration: 0
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        const fetchRoutines = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/auth/profile`, {
                    headers: { authorization: `Bearer ${token}` },
                });
                setRoutines(data.currentRoutine);
            } catch (error) {
                setError("Oops! Something went wrong. Please try again later!");
            } finally {
                setLoading(false);
            }
        };

        if (!isLoading && currentUser) {
            fetchRoutines();
        }
    }, [isLoading, currentUser]); 

    const handleDeleteRoutine = async (routineId) => {
        try {
            await axios.delete(`${API_URL}/routines/delete-routine/${routineId}`);
            setRoutines(routines.filter(routine => routine._id !== routineId));
        } catch (error) {
            console.error("Error deleting routine:", error);
        }
    };

    const handleEditRoutine = (routineId) => {
        const routineToEdit = routines.find(routine => routine._id === routineId);
        setEditedRoutine({
            name: routineToEdit.name,
            workout: routineToEdit.workout,
            bodyPart: routineToEdit.bodyPart,
            totalDuration: routineToEdit.totalDuration
        });
        setEditRoutineId(routineId);
    };

    const handleCancelEditRoutine = () => {
        setEditRoutineId(null);
        setEditedRoutine({
            name: '',
            workout: '',
            bodyPart: '',
            totalDuration: 0
        });
    };

    const handleSaveEditRoutine = async () => {
        try {
            const response = await axios.patch(`${API_URL}/routines/update-routine/${editRoutineId}`, editedRoutine);
            const updatedRoutine = response.data;
            const updatedRoutines = routines.map(routine =>
                routine._id === updatedRoutine._id ? updatedRoutine : routine
            );
            setRoutines(updatedRoutines);
            setEditRoutineId(null);
            setEditedRoutine({
                name: '',
                workout: '',
                bodyPart: '',
                totalDuration: 0
            });
        } catch (error) {
            console.error("Error updating routine:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRoutine(prevState => ({
            ...prevState,
            [name]: name === 'totalDuration' ? Number(value) : value 
        }));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Oops! Something went wrong. Please try again later!</p>;
    }

    return (
        <div className="routine-page">
            <h1 className="page-title">Keep motivated, bro! Stay consistent and achieve your goals!</h1>
            <div className="routine-cards">
                {routines.map(routine => (
                    <div className="routine-card" key={routine._id}>
                        {editRoutineId === routine._id ? (
                            <div className="edit-routine-form">
                                <h2>Edit Routine</h2>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" value={editedRoutine.name} onChange={handleInputChange} />
                                <label htmlFor="workout">Workout</label>
                                <input type="text" id="workout" name="workout" value={editedRoutine.workout} onChange={handleInputChange} />
                                <label htmlFor="bodyPart">Body Part</label>
                                <input type="text" id="bodyPart" name="bodyPart" value={editedRoutine.bodyPart} onChange={handleInputChange} />
                                <label htmlFor="totalDuration">Total Duration (mins)</label>
                                <input type="number" id="totalDuration" name="totalDuration" value={editedRoutine.totalDuration} onChange={handleInputChange} />
                                <div className="button-container">
                                    <button className="btn btn-save" onClick={handleSaveEditRoutine}>Save</button>
                                    <button className="btn btn-cancel" onClick={handleCancelEditRoutine}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="routine-name">{routine.name}</h2>
                                <p><strong>Workout:</strong> {routine.workout}</p>
                                <p><strong>Body Part:</strong> {routine.bodyPart}</p>
                                <p><strong>Total Duration:</strong> {routine.totalDuration} mins</p>
                                <p><strong>Date Added:</strong> {new Date(routine.date).toLocaleDateString()}</p>
                                <div className="button-container">
                                    <button className="btn btn-edit" onClick={() => handleEditRoutine(routine._id)}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => handleDeleteRoutine(routine._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoutinePage;
