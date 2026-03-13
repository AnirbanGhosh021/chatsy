import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigninUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in AuthCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/singup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully 🎉");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully 🎉");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
  
    try {
     await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully 🎉");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
      console.log("Logout error", error)
    }
  },
}));