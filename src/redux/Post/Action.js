import {
  CREATE_NEW_POST,
  DELETE_POST,
  GET_CURR_USER_POSTS,
  GET_SAVED_POSTS,
  GET_SINGLE_POST,
  GET_USERS_POSTS,
  LIKE_POST,
  REQ_USER_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "./ActionType";
import axios from "axios";

const BASE_API = "http://localhost:5455/api";

export const createPostAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .post(`${BASE_API}/posts/create`, JSON.stringify(data.data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: CREATE_NEW_POST, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const findAllUsersPostAction = (token) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/posts/all-posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: GET_USERS_POSTS, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const currUserPostAction = (token) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/posts/curr-user-posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: GET_CURR_USER_POSTS, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const findSinglePostByIdAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/posts/singlePost/${data.postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: GET_SINGLE_POST, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const likePostAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/posts/like/${data.postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response.data);

    dispatch({ type: LIKE_POST, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePostAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/posts/unlike/${data.postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response.data);

    dispatch({ type: UNLIKE_POST, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const savePostAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/posts/save_post/${data.postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response);

    dispatch({ type: SAVE_POST, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const unsavePostAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/posts/unsave_post/${data.postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response);

    dispatch({ type: UNSAVE_POST, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const deletePostAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/posts/delete/${data.postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response);

    dispatch({ type: DELETE_POST, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPostsAction = (token) => async (dispatch) => {
  try {
    const res = await axios
      .get(`${BASE_API}/posts/saved_posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => response.data);

    dispatch({ type: GET_SAVED_POSTS, payload: res });
  } catch (error) {
    console.log(error);
  }
};
