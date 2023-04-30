import axios from 'axios';

export const internalApiClient = axios.create({
  baseURL: (process.env.NODE_ENV === 'development' ? 'http://localhost:8080': '/api')
})