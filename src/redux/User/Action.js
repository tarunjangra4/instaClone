import axios from "axios";
import {
  FOLLOW_USER,
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  REQ_USER,
  SEARCH_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
  SUGGESTED_USER,
  FOLLOWERS_LIST,
  FOLLOWING_USERS_LIST,
  REMOVE_FOLLOWER,
  FOLLOWERS_LIST_BY_USERNAME,
  FOLLOWING_USERS_LIST_BY_USERNAME,
} from "./ActionType";

const BASE_API = "http://localhost:5455/api";

export const getUserProfileAction = (jwt) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/users/req`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      })
      .then((response) => response.data);

    dispatch({ type: REQ_USER, payload: res });
  } catch (error) {
    console.error(error);
  }
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

  dispatch({ type: FOLLOW_USER, payload: res });
};

export const unfollowUserAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/users/unfollow/${data.userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response.data);

    dispatch({ type: UNFOLLOW_USER, payload: res });
  } catch (err) {
    console.error(err);
  }
};

export const suggestedUsers = (data) => async (dispatch) => {
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
    console.error(error);
  }
};

export const getFollowersListAction = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/users/followers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const followers = await res.json();
    dispatch({ type: FOLLOWERS_LIST, payload: followers });
  } catch (error) {
    console.error(error);
  }
};

export const getFollowingUsersListAction = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/users/following`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const followingUsers = await res.json();
    dispatch({ type: FOLLOWING_USERS_LIST, payload: followingUsers });
  } catch (error) {
    console.error(error);
  }
};

export const removeFollower = (data) => async (dispatch) => {
  const res = await axios
    .put(
      `${BASE_API}/users/remove-follower`,
      {},
      {
        params: { followerId: data.userId },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      }
    )
    .then((response) => response.data);

  dispatch({ type: REMOVE_FOLLOWER, payload: res });
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
    console.error(error);
  }
};

export const editUserProfileAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/users/account/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body: JSON.stringify(data.body),
    });

    const user = await res.json();
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (error) {
    console.error(error);
  }
};

export const findUserByUsernameAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/users/username/${data.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: GET_USER_BY_USERNAME, payload: res });
  } catch (err) {
    console.error(err);
  }
};

export const getFollowersListByUsernameAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/users/followers/${data.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: FOLLOWERS_LIST_BY_USERNAME, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const getFolloweringUsersListByUsernameAction =
  (data) => async (dispatch) => {
    try {
      const res = await axios
        .get(`${BASE_API}/users/following/${data.username}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        })
        .then((response) => response.data);

      dispatch({ type: FOLLOWING_USERS_LIST_BY_USERNAME, payload: res });
    } catch (error) {
      console.log(error);
    }
  };
