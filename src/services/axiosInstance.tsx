import axios from "axios";
import { getCookie } from "cookies-next";
import Router from "next/router";
const API_URL = "https://ms.itmd-b1.com:5123/api";
const excludedAPIs = [
  "/login",
  "/register",
  "/set-password",
  "/reset-password",
  "/forgot-password",
];

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (!navigator.onLine) {
    Router.push("/no-internet");
    return Promise.reject("No internet connection");
  }

  const token = getCookie("token");

  const isExcluded = excludedAPIs.some((endpoint) =>
    config.url?.startsWith(endpoint)
  );

  if (!token && !isExcluded) {
    Router.push("/auth/signin");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Router.push("/auth/signin");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
