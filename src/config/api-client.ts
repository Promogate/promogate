import axios from 'axios';

const setupAPIURL = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/api'
}

export const api = axios.create({
  baseURL: setupAPIURL()
})