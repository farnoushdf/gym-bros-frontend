import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import UserRoutinePage from "./pages/UserRoutinePage/UserRoutinePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navbar from "./components/NavBar/NavBar";
import ProgressPage from "./pages/ProgressPage/ProgressPage";
import SetTargetPage from "./pages/SetTargetPage/SetTargetPage";
import UpdateProgressPage from "./pages/UpdateProgressPage/UpdateProgressPage";
import targetData from "./assets/db/target-data.json";
import axios from "axios";
import WorkoutListPage from "./pages/WorkoutListPage/WorkoutListPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage/WorkoutDetailsPage";
const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

    const initialTargets = /*JSON.parse(localStorage.getItem("targets")) || */{
      water: 0,
      weight: 0,
      workout: 0,
      sleep: 0,
      walk: 0,
    };
  const [targets, setTargets] = useState({ initialTargets });
  console.log("target:", targets);

  const [progress, setProgress] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

  // useEffect(() => {
  //   const fetchProgress = async () => {
  //     try {
  //       const { data } = await axios.get(`${API_URL}/progress/all-progress`);
  //       console.log("progress data from DB:", data);
  //       setProgress(data);
  //     } catch (error) {
  //       console.log("Error fetching progress data:", error);
  //     }
  //   };
  //   fetchProgress();
  // }, [])

    useEffect(() => {
      const fetchTargets = async () => {
        try {
          const { data } = await axios.get(`${API_URL}/progress/all-progress`);
          console.log("targets data from API:", data);
          setTargets(data);
        } catch (error) {
          console.log("Error fetching targets data:", error);
        }
      };

      fetchTargets();
    }, []);



  const handleSetTargets = (newTargets) => {
    console.log("new Trget:", newTargets);
    // localStorage.setItem("targets", newTargets);
    setTargets(newTargets);
  };

  const handleUpdateProgress = (newProgress) => {
    console.log("new progress:", newProgress);
    setProgress((prevProgress) => ({
      ...prevProgress,
      ...newProgress,
    }));
  };

  return (
    <>
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserRoutinePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/progress"
          element={<ProgressPage targets={targets} progress={progress} />}
        />
        <Route
          path="/set-targets"
          element={<SetTargetPage setTargets={handleSetTargets} />}
        />
        <Route
          path="/update-progress"
          element={<UpdateProgressPage updateProgress={handleUpdateProgress} />}
        />
        <Route path="/workouts-list" element={<WorkoutListPage />} />
        <Route path="/workouts/:id" element={<WorkoutDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
