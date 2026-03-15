import axios from "axios";
export const axiosInstance =  axios.create({
    baseURL:
  import.meta.env.MODE === "development"
    ? " https://chats-1backends.onrender.com/api"
    : "http://localhost:3000/api",
    withCredentials: true
})
