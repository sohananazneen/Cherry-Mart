// API Configuration
// Supports both build-time env vars and runtime config via window object
const getRuntimeConfig = () => {
  if (typeof window !== "undefined") {
    // @ts-expect-error - Runtime config injected by config.js
    return window.__API_CONFIG__?.apiUrl;
  }
  return null;
};

const API_BASE_URL =
  getRuntimeConfig() ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    demo: `${API_BASE_URL}/api/auth/demo`,
  },
  contact: `${API_BASE_URL}/api/contact`,
  products: `${API_BASE_URL}/api/products`,
};

export default API_BASE_URL;
