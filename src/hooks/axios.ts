import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getToken } from "./AsyncStorage";

// Create a new Axios instance with a base URL
const api = axios.create({
  baseURL:
    "https://fast-transfer-api-staging-b93efabd8361.herokuapp.com/api/v1/",
});

// Add a request interceptor to include JWT token in the headers
api.interceptors.request.use(
  //@ts-ignore
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    try {
      // Fetch the JWT token from AsyncStorage
      const jwtToken = await getToken();
      console.log(jwtToken, "jwtToken from axios");

      // If a token is available, include it in the Authorization header
      if (jwtToken.token !== null) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${jwtToken.token}`,
        };
      }

      return config;
    } catch (error) {
      // Handle AsyncStorage errors or other issues
      console.error("Error fetching JWT token:", error);
      return config;
    }
  },
  (error: AxiosError) => {
    // Handle request errors
    console.log("Error in request interceptor:", error.message);
  }
);

export default api;
