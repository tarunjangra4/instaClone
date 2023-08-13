import axios from "axios";
import { SIGN_IN, SIGN_UP } from "./ActionType";

const BASE_API = "http://localhost:5455";

export const SigninAction = (data) => async (dispatch) => {
  try {
    // const res = await fetch("http://localhost:5455/signin", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Basic " + btoa(data.email + ":" + data.password),
    //   },
    // });
    const res = await axios
      .get(`${BASE_API}/signin`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(data.email + ":" + data.password),
        },
        withCredentials: true,
      })
      .then((response) => response);

    const token = res.headers.get("Authorization");
    localStorage.setItem("token", token);
    dispatch({ type: SIGN_IN, payload: token });
  } catch (error) {
    console.log(error);
  }
};

export const SignupAction = (data) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${BASE_API}/signup`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);

    dispatch({ type: SIGN_UP, payload: user });
  } catch (error) {
    console.log(error);
  }
};
