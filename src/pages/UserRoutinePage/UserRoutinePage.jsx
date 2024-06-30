import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CreateMeal from "../../components/CreateMeal/CreateMeal";
import CreateRoutine from "../../components/CreateRoutine/CreateRoutine";
import mealService from "../../services/meal.service";
import { AuthContext } from "../../context/auth.context";
import routineService from "../../services/routine.service";

const UserRoutinePage = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [meals, setMeals] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      const fetchMeals = async () => {
        try {
          const mealsResponse = await mealService.fetchUserMeals(currentUser._id);
          setMeals(mealsResponse.data || []);  
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      };

      const fetchRoutines = async () => {
        try {
          const routinesResponse = await routineService.fetchUserRoutines(currentUser._id);
          setRoutines(routinesResponse.data || []);  
        } catch (error) {
          console.error("Error fetching routines:", error);
        }
      };

      fetchMeals();
      fetchRoutines();
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

  if (isLoading) return <div>Loading...</div>;
  if (!currentUser) return <div>Please log in to view your routines.</div>;

  return (
    <div className="user-routine-page">
      <h1>Your Routine </h1>
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
          <h3>Meals</h3>
          <ul>
            {meals.length > 0 ? (
              meals.map((meal) => <li key={meal._id}>{meal.name}</li>)
            ) : (
              <li>No meals available</li>
            )}
          </ul>
          <h3>Routines</h3>
          <ul>
            {routines.length > 0 ? (
              routines.map((routine) => <li key={routine._id}>{routine.name}</li>)
            ) : (
              <li>No routines available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserRoutinePage;
