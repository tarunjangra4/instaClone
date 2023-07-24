import {
  FOLLOW_USER,
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  REQ_USER,
  SEARCH_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
  SUGGESTED_USER,
} from "./ActionType";

const BASE_API = "http://localhost:5455/api";

export const getUserProfileAction = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/users/req`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    const currUser = await res.json();
    // console.log("user response ", currUser);
    dispatch({ type: REQ_USER, payload: currUser });
  } catch (error) {
    console.log(error);
  }
};

export const findUserByUsernameAction = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_API}/users/username/${data.username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });

  const user = await res.json();
  dispatch({ type: GET_USER_BY_USERNAME, payload: user });
};

export const findUserByUserIds = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_API}/users/username/${data.userIds}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });

  const users = await res.json();
  dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });
};

export const followUserAction = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_API}/users/follow/${data.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });

  const user = await res.json();
  dispatch({ type: FOLLOW_USER, payload: user });
};

export const unfollowUserAction = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_API}/users/unfollow/${data.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });

  const user = await res.json();
  dispatch({ type: UNFOLLOW_USER, payload: user });
};

export const searchUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/users/search/?q=${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });

    const user = await res.json();
    dispatch({ type: SEARCH_USER, payload: user });
  } catch (error) {
    console.log(error);
  }
};

export const editUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/users/search/account/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body: JSON.stringify(data.data),
    });

    const user = await res.json();
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (error) {
    console.log(error);
  }
};

export const suggestedUsers = (data) => async (dispatch) => {
  console.log("here");
  try {
    const res = await fetch(`${BASE_API}/users/suggestions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });

    const user = await res.json();
    dispatch({ type: SUGGESTED_USER, payload: user });
  } catch (error) {
    console.log(error);
  }
};
