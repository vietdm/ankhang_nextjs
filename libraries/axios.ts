import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: "http://mvtp.site/api/",
});

export interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

instance.interceptors.request.use(
  async (config) => {
    // Implement function to get token
    const token = {
      accessToken: getCookie('_token'),
      refreshToken: "",
    };

    if (token?.accessToken) {
      config.headers.Authorization = `Bearer ${token?.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: any) => {
    if (typeof response?.data != "undefined") {
      return response.data as ApiResponse;
    }
    return response as ApiResponse;
  },
  async (error) => {
    if (typeof error.response?.data != "undefined") {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export const fetch = instance;
