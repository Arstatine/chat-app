import axios from 'axios';

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
