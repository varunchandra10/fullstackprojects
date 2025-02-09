import * as api from "../api/api";
import { AuthSuccess } from "../redux/authReducer";
import { fetchCurrentUser } from "../redux/currentReducer";

export const signup = (authData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch(AuthSuccess(data));
    dispatch(fetchCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    return data;
  } catch (error) {
    console.log("Error in signup action: ", error); // Add this console log
  }
};

export const login = (authData) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch(AuthSuccess(data));
    dispatch(fetchCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    return data;
  } catch (error) {
    console.log(error);
  }
};
