import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CreateMeal from "../../components/CreateMeal/CreateMeal";
import CreateRoutine from "../../components/CreateRoutine/CreateRoutine";

const API_URL = import.meta.env.VITE_API_URL;

const UserRoutinePage = () => {
  const [userRoutines, setUserRoutines] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);

  useEffect(() => {
    const fetchUserRoutines = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user-routines`);
        setUserRoutines(response.data);
      } catch (error) {
        console.error("Error fetching user routines:", error);
      }
    };

    fetchUserRoutines();
  }, []);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="user-routine-page">
      <h1>User Routine Page</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="user-routines">
        <h2>Routines for {selectedDate.toDateString()}</h2>
        <ul>
          {userRoutines.map((routine) => (
            <li key={routine._id}>
              <Link to={`/edit-routine/${routine._id}`}>{routine.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="routine-links">
        <button onClick={() => setShowCreateMeal(true)}>Add Meal</button>
        <button onClick={() => setShowCreateRoutine(true)}>Add Exercise</button>
        <Link to="/meals">Manage Meals</Link>
        <Link to="/exercises">Manage Exercises</Link>
      </div>

      {showCreateMeal && <CreateMeal setOpen={setShowCreateMeal} />}
      {showCreateRoutine && <CreateRoutine setOpen={setShowCreateRoutine} />}
    </div>
  );
};

export default UserRoutinePage;
