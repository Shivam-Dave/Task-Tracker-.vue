// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for your NestJS backend
  withCredentials: true, // If you need to send cookies with requests
});

export default apiClient;
