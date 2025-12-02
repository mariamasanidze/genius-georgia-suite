import axios, { AxiosHeaders } from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor
api.interceptors.request.use((config) => {
  // PUBLIC endpoints (no Authorization header)
  const isAuthEndpoint =
    config.url?.includes("/auth/login") ||
    config.url?.includes("/auth/register") ||
    config.url?.includes("/auth/activate-account") ||
    config.url?.includes("/auth/refresh") ||
    config.url?.includes("/auth/forgot-password") ||
    config.url?.includes("/auth/reset-password");

  if (isAuthEndpoint) {
    return config;
  }

  // PRIVATE endpoints → Add token
  const session = localStorage.getItem("sg_session");

  if (session) {
    const parsed = JSON.parse(session);
    const token = parsed?.accessToken;

    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      // If Axios v1 uses .set(), use it
      if ((config.headers as any).set) {
        (config.headers as any).set("Authorization", `Bearer ${token}`);
      } 
      // Fallback for older Axios
      else {
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }
    }
  }

  return config;
});

export default api;
