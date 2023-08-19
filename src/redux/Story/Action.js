import axios from "axios";
import {
  CREATE_STORY,
  FETCH_FOLLOWING_USER_STORY,
  FETCH_USER_STORY,
  FETCH_USERS_HAS_STORY,
} from "./ActionType";

const BASE_API = "http://localhost:5455/api";

export const createStory = (data) => async (dispatch) => {
  try {
    const res = await axios
      .post(`${BASE_API}/story/create`, JSON.stringify(data.data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: CREATE_STORY, payload: res });
  } catch (error) {
    console.error(error);
  }
};

export const getFollowingUserStory = (data) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/story/all/${data.userIds}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: FETCH_FOLLOWING_USER_STORY, payload: res });
  } catch (error) {
    console.error(error);
  }
};

export const getStoryByUserId = (data) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/story/${data.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: FETCH_USER_STORY, payload: res });
  } catch (error) {
    console.error(error);
  }
};

export const getUsersHasStory = (data) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/story/${data.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: FETCH_USERS_HAS_STORY, payload: res });
  } catch (error) {
    console.error(error);
  }
};
