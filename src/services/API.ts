import axios, { AxiosInstance } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apiKey: API_KEY,
  };
  return config;
});

export const fetcher = <T>(url: string): Promise<T> =>
  API.get(url).then((res) => res.data);

export default API;
