import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import WorkoutListPage from "./pages/WorkoutListPage/WorkoutListPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage/WorkoutDetailsPage";


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserRoutinePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/set-targets" element={<SetTargetPage />} />
        <Route path="/update-progress" element={<UpdateProgressPage />} />
        <Route path="/workouts-list" element={<WorkoutListPage />} />
        <Route path="/workouts/:id" element={<WorkoutDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
