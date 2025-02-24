import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL 

export default axios.create({
  baseURL: BASE_URL,
  timeout: 8000
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 8000
});