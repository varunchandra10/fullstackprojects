import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });
// const API = axios.create({ baseURL: "https://portfolio-builder-cfbp.onrender.com" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});
export default API;

// =================================== Login signup functions ==============================================================
export const logIn = (authData) =>
  API.post("/user/login", authData);
export const signUp = (authData) =>
  API.post("/user/signup", authData);
