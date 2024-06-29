import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import routineService from '../../services/routine.service';

const CreateRoutine = ({ setOpen }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [workout, setWorkout] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newRoutine = {
      name,
      workout,
      bodyPart,
      totalDuration,
    };

    try {
      setIsDisabled(true);
      const response = await routineService.createRoutine(newRoutine);
      if (response.status === 201) {
        navigate('/profile');
        setOpen(false);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error creating routine');
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div>
      <div>
        <div>Add Exercise</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Routine Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isDisabled}
              placeholder="Enter routine name"
            />
          </div>

          <div>
            <label>Workout:</label>
            <input
              type="text"
              name="workout"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
              disabled={isDisabled}
              placeholder="Enter workout"
            />
          </div>

          <div>
            <label>Body Part:</label>
            <input
              type="text"
              name="bodyPart"
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
              disabled={isDisabled}
              placeholder="Enter body part"
            />
          </div>

          <div>
            <label>Total Duration:</label>
            <input
              type="number"
              name="totalDuration"
              value={totalDuration}
              onChange={(e) => setTotalDuration(e.target.value)}
              disabled={isDisabled}
              placeholder="Enter total duration in minutes"
            />
          </div>

          <div>
            <p className="error-message">{errorMessage && errorMessage}</p>
            <button type="submit" disabled={isDisabled}>
              Save
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoutine;
