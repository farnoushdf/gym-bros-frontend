import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import UserRoutinePage from "./pages/UserRoutinePage/UserRoutinePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navbar from "./components/NavBar/NavBar";
import ProgressPage from "./pages/ProgressPage/ProgressPage";
import SetTargetPage from "./pages/SetTargetPage/SetTargetPage";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const [targets, setTargets] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

  const [progress, setProgress] = useState({
    water: 0,
    weight: 0,
    workout: 0,
    sleep: 0,
    walk: 0,
  });

  const handleSetTargets = (newTargets) => {
    setTargets(newTargets);
  };

  const handleUpdateProgress = (newProgress) => {
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
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/progress"
          element={<ProgressPage targets={targets} progress={progress} />}
        />
        <Route
          path="/set-targets"
          element={<SetTargetPage setTargets={handleSetTargets} />}
        />
      </Routes>
    </>
  );
}

export default App;
