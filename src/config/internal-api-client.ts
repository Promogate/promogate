import axios from 'axios';

export const internalApiClient = axios.create({
  baseURL: (process.env.NODE_ENV === 'development' ? '/api': 'https://api.promogate.app/')
})