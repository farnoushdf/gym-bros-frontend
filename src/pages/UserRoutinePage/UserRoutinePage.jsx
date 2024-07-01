import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CreateMeal from "../../components/CreateMeal/CreateMeal";
import CreateRoutine from "../../components/CreateRoutine/CreateRoutine";
import { AuthContext } from "../../context/auth.context";
import routineService from "../../services/routine.service";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const UserRoutinePage = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [meals, setMeals] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [editRoutineId, setEditRoutineId] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/auth/profile`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setRoutines(data.currentRoutine);
        setMeals(data.currentMeal);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (!isLoading && currentUser) {
      fetchUserDetails();
    }
  }, [isLoading, currentUser]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMealCreated = (newMeal) => {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };

  const handleRoutineCreated = (newRoutine) => {
    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
  };

  const handleEditRoutine = (routineId) => {
    setEditRoutineId(routineId);
  };

  const handleCancelEdit = () => {
    setEditRoutineId(null);
  };

  const handleRoutineUpdated = (updatedRoutine) => {
    const updatedRoutines = routines.map((routine) =>
      routine._id === updatedRoutine._id ? updatedRoutine : routine
    );
    setRoutines(updatedRoutines);
    setEditRoutineId(null);
  };

  const filterEntriesByDate = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date).toDateString();
      const selectedDateString = selectedDate.toDateString();
      return entryDate === selectedDateString;
    });
  };

  const filteredMeals = filterEntriesByDate(meals);
  const filteredRoutines = filterEntriesByDate(routines);

  if (isLoading) return <div>Loading...</div>;
  if (!currentUser) return <div>Please log in to view your routines.</div>;

  return (
    <div className="user-routine-page">
      <h1>Your Routine</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <div className="routine-links">
        <button onClick={() => setShowCreateMeal(true)}>Add Meal</button>
        <button onClick={() => setShowCreateRoutine(true)}>Add Routine</button>
        <Link to="/meals">Manage Meals</Link>
        <Link to="/routines">Manage Routines</Link>
      </div>

      {showCreateMeal && (
        <CreateMeal
          setOpen={setShowCreateMeal}
          onMealCreated={handleMealCreated}
          selectedDate={selectedDate}
        />
      )}
      {showCreateRoutine && (
        <CreateRoutine
          setOpen={setShowCreateRoutine}
          onRoutineCreated={handleRoutineCreated}
          selectedDate={selectedDate}
        />
      )}

      <div className="user-entries">
        <h2>Meals and Routines for {selectedDate.toDateString()}</h2>
        <div className="entries">
          <h3>Meals</h3>
          <ul>
            {filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => <li key={meal._id}>{meal.name}</li>)
            ) : (
              <p>No meals available</p>
            )}
          </ul>
          <h3>Routines</h3>
          <ul>
            {filteredRoutines.length > 0 ? (
              filteredRoutines.map((routine) => (
                <li key={routine._id}>
                  {routine.name}{" "}
                  <button onClick={() => handleEditRoutine(routine._id)}>
                    Edit
                  </button>
                </li>
              ))
            ) : (
              <p>No routines available</p>
            )}
          </ul>
        </div>
      </div>

      {editRoutineId && (
        <div className="edit-routine-form">
          <h2>Edit Routine</h2>
          <EditRoutineForm
            routineId={editRoutineId}
            onCancel={handleCancelEdit}
            onRoutineUpdated={handleRoutineUpdated}
          />
        </div>
      )}
    </div>
  );
};

const EditRoutineForm = ({ routineId, onCancel, onRoutineUpdated }) => {
  const [name, setName] = useState('');
  const [workout, setWorkout] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchRoutineDetails = async () => {
      try {
        const response = await routineService.fetchOneRoutine(routineId);
        const { name, workout, bodyPart, totalDuration } = response;
        setName(name);
        setWorkout(workout);
        setBodyPart(bodyPart);
        setTotalDuration(totalDuration);
      } catch (error) {
        console.error('Error fetching routine details:', error);
        setErrorMessage('Error fetching routine details');
      }
    };

    fetchRoutineDetails();
  }, [routineId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedRoutine = {
      name,
      workout,
      bodyPart,
      totalDuration,
    };

    try {
      const response = await routineService.updateRoutine(routineId, updatedRoutine);
      onRoutineUpdated(response); 
    } catch (error) {
      console.error('Error updating routine:', error);
      setErrorMessage('Error updating routine');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <label>Routine Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Workout:</label>
      <input
        type="text"
        value={workout}
        onChange={(e) => setWorkout(e.target.value)}
      />
      <label>Body Part:</label>
      <input
        type="text"
        value={bodyPart}
        onChange={(e) => setBodyPart(e.target.value)}
      />
      <label>Total Duration:</label>
      <input
        type="number"
        value={totalDuration}
        onChange={(e) => setTotalDuration(e.target.value)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Update Routine</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UserRoutinePage;
