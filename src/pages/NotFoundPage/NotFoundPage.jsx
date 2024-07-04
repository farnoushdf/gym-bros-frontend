
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; 

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! Looks like you're lost in the gym.</p>
      <p className="not-found-suggestion">No worries, let's get you back on track!</p>
      <Link to="/home" className="not-found-link">🏋️ Back to Your GymBros 🏋️</Link>
    </div>
  );
}

export default NotFoundPage;
