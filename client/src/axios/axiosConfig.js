import axios from "axios";

export const instance = axios.create({
  baseURL: "https://jandc-api.onrender.com/api/v1",
  /*   timeout: 1000, */
  headers: { "X-Custom-Header": "foobar" },
  mode: "cors",
});
