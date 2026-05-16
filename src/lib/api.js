import axios from "axios";

// Frontend-only API client
export const api = axios.create({ timeout: 15000 });
