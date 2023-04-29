import axios from 'axios';

export const internalApiClient = axios.create({
  baseURL: '/api'
})