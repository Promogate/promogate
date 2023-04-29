import axios from 'axios';
import { API_URL } from './variables';

export const externalApiClient = axios.create({
  baseURL: (process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : API_URL)
})