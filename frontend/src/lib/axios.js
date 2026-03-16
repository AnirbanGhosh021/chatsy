import axios from "axios";
export const axiosInstance =  axios.create({
    baseURL:  "https://chatsy-backens.onrender.com/api",
    withCredentials: true
})
