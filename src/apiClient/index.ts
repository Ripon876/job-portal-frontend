import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_BASE;
const apiVersoin = import.meta.env.VITE_APP_API_VERSION;

export const apiClient = axios.create({
  baseURL: `${baseURL}/api/${apiVersoin}`,
  withCredentials: true,
});
