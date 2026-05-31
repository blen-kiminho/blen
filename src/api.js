import axios from "axios";

export const api = axios.create({
  baseURL: "https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});