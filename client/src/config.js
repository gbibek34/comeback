const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000;
const API_URL = `http://localhost:${BACKEND_PORT}/api`;

export { API_URL };