// lib/axiosInstance.ts
import axios from "axios";
import { getToken , setToken, clearToken } from "./authStore";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
  withCredentials: true, // sends refresh token cookie
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh logic
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}/api/auth/refreshToken`,
          {},
          { withCredentials: true }
        );

        setToken(data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(original);
      } catch {
        clearToken();
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;
