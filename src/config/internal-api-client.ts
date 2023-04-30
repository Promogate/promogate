import axios from 'axios';

export const internalApiClient = axios.create({
  baseURL: (process.env.NODE_ENV === 'development' ? 'https://api.promogate.app/': 'https://api.promogate.app/')
})