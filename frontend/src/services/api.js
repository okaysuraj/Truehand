import axios from 'axios';
import { auth } from '../config/firebase';
import { guardApiSession } from '../../../shared/api-session';

const configuredURL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api').replace(
  /\/$/,
  '',
);
const API_URL = configuredURL.endsWith('/api') ? configuredURL : `${configuredURL}/api`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

const sessionApi = guardApiSession(
  api,
  auth,
  (message) => new axios.CanceledError(message),
  () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('truehand-auth-expired'));
  },
);

export default sessionApi;
