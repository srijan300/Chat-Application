export function formatMessageTime(date){
        return new Date(date).toLocaleTimeString("en-US", {
             hour:"2-digit",
             minute: "2-digit",
             hour12:false,
        })
}

import axios from "axios";

// Axios instance configured with backend base URL from .env
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // optional, for cookies/auth headers
});
