import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CreateMeal from "../../components/CreateMeal/CreateMeal";
import CreateRoutine from "../../components/CreateRoutine/CreateRoutine";
import mealService from "../../services/meal.service";
import { AuthContext } from "../../context/auth.context";
import routineService from "../../services/routine.service";

const UserRoutinePage = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [meals, setMeals] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsResponse = await mealService.fetchUserMeals(userId);
        setMeals(mealsResponse.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    const fetchRoutines = async () => {
      try {
        const routinesResponse = await routineService.fetchUserRoutines(userId);
        setRoutines(routinesResponse.data);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };

    fetchMeals();
    fetchRoutines();
  }, [userId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMealCreated = (newMeal) => {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };

  const handleRoutineCreated = (newRoutine) => {
    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
  };

  return (
    <div className="user-routine-page">
      <h1>User Routine Page</h1>
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
        <CreateMeal setOpen={setShowCreateMeal} onMealCreated={handleMealCreated} />
      )}
      {showCreateRoutine && (
        <CreateRoutine setOpen={setShowCreateRoutine} onRoutineCreated={handleRoutineCreated} />
      )}

      <div className="user-entries">
        <h2>Meals and Routines for {selectedDate.toDateString()}</h2>
        <div className="entries">
          <h3>Meals:</h3>
          <ul>
            {meals.map((meal) => (
              <li key={meal._id}>{meal.name}</li>
            ))}
          </ul>
          <h3>Routines:</h3>
          <ul>
            {routines.map((routine) => (
              <li key={routine._id}>
                <Link to={`/routines/${routine._id}`}>{routine.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserRoutinePage;
