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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 500) {
      window.location = "/errorserver";
    } else {
      return Promise.reject(error);
    }
  }
);

export { axiosInstance };
