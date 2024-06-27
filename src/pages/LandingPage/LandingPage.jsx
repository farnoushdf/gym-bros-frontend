import { Link } from 'react-router-dom'; 

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to gymBROS!</h1>
      <p>Start your fitness journey here.</p>
      <Link to="/home">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default LandingPage;
