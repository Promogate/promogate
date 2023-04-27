import axios from 'axios';
import { API_KEY } from './variables';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'X-API-KEY': API_KEY
  }
})