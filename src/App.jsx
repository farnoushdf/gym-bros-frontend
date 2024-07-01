import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import UserRoutinePage from "./pages/UserRoutinePage/UserRoutinePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navbar from "./components/NavBar/NavBar";
import MealListPage from "./pages/MealListPage/MealListPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage/WorkoutDetailsPage";
import WorkoutListPage from "./pages/WorkoutListPage/WorkoutListPage";
import IsPrivate from "./components/IsPrivate";
import MealDetailsPage from "./pages/MealDetailsPage/MealDetailsPage";
import YourMealPage from "./pages/YourMealPage/YourMealPage";
import YourMealDetailsPage from "./pages/YourMealDetailsPage/YourMealDetailPage";
import Footer from "./components/Footer/Footer";
import RoutinePage from "./pages/RoutinePage/RoutinePage";
import RoutineDetailsPage from "./pages/RoutineDetailsPage/RoutineDetailsPage";

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

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserRoutinePage />
            </IsPrivate>
          }
        />
        <Route
          path="/meals"
          element={
            <IsPrivate>
              <MealListPage />
            </IsPrivate>
          }
        />

        <Route
          path="/meals/:id"
          element={
            <IsPrivate>
              <MealDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/meals/:id"
          element={
            <IsPrivate>
              <MealDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/your-meals"
          element={
            <IsPrivate>
              <YourMealPage />
            </IsPrivate>
          }
         /> 

        <Route
          path="/your-meals/:id"
          element={
            <IsPrivate>
              <YourMealDetailsPage />
            </IsPrivate>
          }
         /> 
        
        <Route
          path="/workouts"
          element={
            <IsPrivate>
              <WorkoutListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/workouts/:id"
          element={
            <IsPrivate>
              <WorkoutDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/your-routines"
          element={
            <IsPrivate>
              <RoutinePage/>
            </IsPrivate>
          }
        />
        <Route
          path="/your-routines/:id"
          element={
            <IsPrivate>
              <RoutineDetailsPage />
            </IsPrivate>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
