// src/lib/api/apiService.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return {
      success: true,
      message: "Registration successful",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};

export const getLoggedInUserRole = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.roles;
  }
  return "";
};

// Jobs functions
export const getAllJobList = async (searchParam = "") => {
  try {
    const url = searchParam
      ? `/jobs?search=${encodeURIComponent(searchParam)}`
      : "/jobs";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch jobs");
  }
};

export const getJobById = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch job details");
  }
};
getJobById(1)
export const postNewJobs = async (job) => {
  try {
    const response = await api.post("/jobs", job);
    return {
      success: true,
      message: "Job posted successfully",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to post job",
    };
  }
};

export const applyForJob = async (jobId) => {
  try {
    const response = await api.post(`/application/${jobId}`);
    return {
      success: true,
      message: "Application submitted successfully",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit application",
    };
  }
};

export const getHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/current");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData);
    return {
      success: true,
      message: "Job updated successfully",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update job",
    };
  }
};

export const deleteJob = async (id) => {
  try {
    await api.delete(`/jobs/${id}`);
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete job",
    };
  }
};

export default api;
