import { SIGN_IN, SIGN_UP } from "./ActionType";

export const SigninAction = (data) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5455/signin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    });
    const token = res.headers.get("Authorization");
    localStorage.setItem("token", token);

    dispatch({ type: SIGN_IN, payload: token });
  } catch (error) {
    console.log(error);
  }
};

export const SignupAction = (data) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5455/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    dispatch({ type: SIGN_UP, payload: user });
  } catch (error) {
    console.log(error);
  }
};
