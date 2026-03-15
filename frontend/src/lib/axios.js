import axios from "axios";
export const axiosInstance =  axios.create({
    baseURL:
  import.meta.env.MODE === "development"
    ? " https://chats-1backends.onrender.com/api"
    : "https://chatsy-back-h2f0.onrender.comapi/ap",
    withCredentials: true
})
