import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoutinePage.css';

const API_URL = import.meta.env.VITE_API_URL;

const RoutinePage = () => {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRoutineId, setEditRoutineId] = useState(null); // State to manage the routine being edited
    const [editedRoutine, setEditedRoutine] = useState({
        name: '',
        workout: '',
        bodyPart: '',
        totalDuration: 0
    });

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await axios.get(`${API_URL}/routines/all-routines`);
                if (response.status === 200) {
                    setRoutines(response.data);
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
                                <input type="text" id="name" name="name" value={editedRoutine.name} onChange={(e) => setEditedRoutine({ ...editedRoutine, name: e.target.value })} />
                                <label htmlFor="workout">Workout</label>
                                <input type="text" id="workout" name="workout" value={editedRoutine.workout} onChange={(e) => setEditedRoutine({ ...editedRoutine, workout: e.target.value })} />
                                <label htmlFor="bodyPart">Body Part</label>
                                <input type="text" id="bodyPart" name="bodyPart" value={editedRoutine.bodyPart} onChange={(e) => setEditedRoutine({ ...editedRoutine, bodyPart: e.target.value })} />
                                <label htmlFor="totalDuration">Total Duration (mins)</label>
                                <input type="number" id="totalDuration" name="totalDuration" value={editedRoutine.totalDuration} onChange={(e) => setEditedRoutine({ ...editedRoutine, totalDuration: e.target.value })} />
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
