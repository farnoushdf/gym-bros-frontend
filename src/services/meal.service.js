import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const mealService = {
  createMeal: async (mealData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_URL}/meals/create-meal`,
        mealData,
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
  fetchOneMeal: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/meals/one-meal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteOneMeal: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${API_URL}/meals/delete-meal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserMeals: async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/meals/user-meals/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllMeals: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/meals/all-meals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateMeal: async (id, mealData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${API_URL}/meals/update-meal/${id}`,
        mealData,
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

export default mealService;
