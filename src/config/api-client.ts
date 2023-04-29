import axios from 'axios';
import { API_URL } from './variables';

const setupAPIURL = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : API_URL
}

export const api = axios.create({
  baseURL: setupAPIURL()
})