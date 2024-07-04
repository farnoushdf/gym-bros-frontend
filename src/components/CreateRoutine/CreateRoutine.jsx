import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import routineService from '../../services/routine.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CreateRoutine = ({ setOpen, onRoutineCreated, selectedDate }) => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [workout, setWorkout] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !workout || !bodyPart || !totalDuration) {
      setErrorMessage('All fields are required');
      return;
    }

    if (totalDuration <= 0) {
      setErrorMessage('Total duration must be a positive number');
      return;
    }

    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append('name', name);
    formData.append('workout', workout);
    formData.append('bodyPart', bodyPart);
    formData.append('totalDuration', totalDuration);
    formData.append('date', new Date(selectedDate).toISOString());
    formData.append('imageUrl', image);

    try {
      setIsDisabled(true);
      const response = await axios.post(`${API_URL}/routines/create-routine`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${currentUser.token}`, 
        },
      });
      onRoutineCreated(response.data);
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error creating routine');
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <FontAwesomeIcon icon={faDumbbell} />
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
          <label>Upload Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
          )}
        </div>

        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={isDisabled}>
            Save
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoutine;
