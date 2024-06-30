import React from "react";
import "./ProgressPage.css";
import { Link } from "react-router-dom";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

const ProgressPage = ({targets, progress}) => {
    const categories = ['Water', 'Weight', 'Workout', 'Sleep', 'Walk'];
    const calculatePercentage = (value, target) => (target > 0 ? (value / target) * 100 : 0);
    console.log(targets, progress)

  return (
    <div>
      <div className="progress-display">
        {categories.map((category) => (
            <div key={category}>
                <h2>{category}</h2>
                <CircularProgressbar /*value={calculatePercentage(progress[category], targets[category])}*/ value={50}
            text={`${Math.round(calculatePercentage(progress[category], targets[category]))}%`}
            styles={buildStyles({
              textColor: '#000',
              pathColor: '#00f',
              trailColor: '#d6d6d6',
              height:'30px',
              whith: '30px'
            })}/>
            </div>
        ))}
      </div>
      <Link to="/set-targets">
        <button>Set your Target</button>
      </Link>
      <Link to="/update-progress">
        <button>Update your progress</button>
      </Link>
    </div>
  );
};

export default ProgressPage;
