import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASEURL}/api/v1`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.common["authorization"] = "Bearer " + token;
  }
  return config;
});

export { axiosInstance };
