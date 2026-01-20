import axios from "axios";

const API = axios.create({
  baseURL: "https://quizpro-8zqq.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error?.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default API;
