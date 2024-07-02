import React from "react";
import { Link } from "react-router-dom";
import fitnessImage from "../../assets/fitness-image.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Ready to Get Started?</h1>
      <div className="auth-links">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
      <img src={fitnessImage} alt="Fitness" />
      <div className="content-section">
        <h2>What is Fitness?</h2>
        <p>
          Fitness isn't just about workouts; it's about feeling your best inside
          and out. It's about building strength, improving flexibility, and
          boosting energy levels through regular physical activity. Beyond the
          physical benefits, staying active helps reduce stress, enhances mood,
          and promotes better sleep.
        </p>
        <h2>How We Help</h2>
        <p>
          With GymBros, you'll find personalized workout routines, expert tips
          on nutrition, and tools to track your progress. Whether you prefer
          cardio, strength training, or yoga, our app offers a variety of
          exercises tailored to your fitness level and goals.
        </p>
        <h2>Join Us</h2>
        <p>
          Join our community of fitness enthusiasts and beginners alike. Start
          your journey today and discover the joy of living a healthier, more
          active life with GymBros.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
