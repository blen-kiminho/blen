import axios from "axios";

export const api = axios.create({
  baseURL: "https://port-0-blen-mpttw6di3d47490d.sel3.cloudtype.app",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

