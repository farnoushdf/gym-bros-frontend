import { Link } from 'react-router-dom';
import './LandingPage.css'; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to GymBros!</h1>
        <p>Start your fitness journey here.</p>
        <Link to="/home">
          <button>Get Started ⬅</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
