import "./App.css";
import { Routes, Route, useLocation} from "react-router-dom";
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
        <Route path="/profile" element={<UserRoutinePage/>} />
        <Route path="/meals" element={<MealListPage/>}/>
        <Route path="/workouts" element={<WorkoutListPage />} />
        <Route path="/workouts/:id" element={<WorkoutDetailsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />

        
      </Routes>
    </>
  );
}

export default App;
