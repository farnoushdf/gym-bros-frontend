import React from "react";
import "./ProgressPage.css";
import { Link } from "react-router-dom";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

const ProgressPage = ({targets, progress}) => {
    const categories = ['Water', 'Weight', 'Workout', 'Sleep', 'Walk'];
    const calculatePercentage = (value, target) => (target > 0 ? (value / target) * 100 : 0);

  return (
    <div>
      <div className="progress-display">
        {categories.map((category) => (
            <div>
                <h2>{category}</h2>
                <CircularProgressbar value={calculatePercentage(progress[category], targets[category])}
            text={`${Math.round(calculatePercentage(progress[category], targets[category]))}%`}
            styles={buildStyles({
              textColor: '#000',
              pathColor: '#00f',
              trailColor: '#d6d6d6'
            })}/>
            </div>
        ))}
      </div>
      <Link>
        <button>Set your Target</button>
      </Link>
      <Link>
        <button>Update your progress</button>
      </Link>
    </div>
  );
};

export default ProgressPage;
