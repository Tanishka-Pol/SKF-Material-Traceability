import axios from 'axios';

// This pulls your Render link in production or falls back to local if the variable isn't set
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;
