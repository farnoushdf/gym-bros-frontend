import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const routineService = {
  createRoutine: async (routineData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_URL}/routines/create-routine`,
        routineData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchOneRoutine: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/routines/one-routine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteOneRoutine: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${API_URL}/routines/delete-routine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserRoutines: async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/routines/user-routines/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllRoutines: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/routines/all-routines`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateRoutine: async (id, routineData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${API_URL}/routines/update-routine/${id}`,
        routineData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default routineService;
