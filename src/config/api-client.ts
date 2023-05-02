import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: (process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/api'),
  headers: {
    Authorization: `Bearer ${cookies['promogate.token']}`
  }
})