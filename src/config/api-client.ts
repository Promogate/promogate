import axios from 'axios';
import { parseCookies } from 'nookies';
import { API_URL } from './variables';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${cookies['promogate.token']}`
  }
})