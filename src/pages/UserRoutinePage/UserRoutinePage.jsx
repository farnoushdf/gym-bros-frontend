import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserRoutinePage = () => {
  const [userRoutines, setUserRoutines] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchUserRoutines = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/user-routines"); 
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
        <Link to="/meals">Manage Meals</Link>
        <Link to="/exercises">Manage Exercises</Link>
      </div>
    </div>
  );
};

export default UserRoutinePage;
