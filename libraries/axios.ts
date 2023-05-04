import axios from "axios";

const instance = axios.create({
  baseURL: "http://mvtp.site/api/",
});

instance.interceptors.request.use(
  async (config) => {
    // Implement function to get token
    const token = {
      accessToken: "",
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
      return response.data as Response;
    }
    return response;
  },
  async (error) => {
    if (typeof error.response?.data != "undefined") {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export const fetch = instance;
