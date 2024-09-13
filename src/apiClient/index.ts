import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_BASE;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});
