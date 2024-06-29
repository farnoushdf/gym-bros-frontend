import { Link } from 'react-router-dom'; 

const HomePage = () => {
  return (
    <div>
      <h1>Ready to Get Started?</h1>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/meals">Meals</Link> 
      </div>
    </div>
  );
};
export default HomePage