import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_POST_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "./ActionType";
import axios, { isCancel, AxiosError } from "axios";

const BASE_API = "http://localhost:5455/api";

export const createCommentAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/comments/create/${data.postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body: JSON.stringify(data.data),
    });

    const comment = await res.json();
    dispatch({ type: CREATE_COMMENT, payload: comment });
  } catch (error) {
    console.log(error);
  }
};

export const findPostCommentAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/comments/${data.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });

    const comment = await res.json();
    dispatch({ type: GET_POST_COMMENT, payload: comment });
  } catch (error) {
    console.log(error);
  }
};

export const likeCommentAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .post(
        `${BASE_API}/comments/like/${data.commentId}/${data.postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response);
    dispatch({ type: LIKE_COMMENT, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const unlikeCommentAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/comments/unlike/${data.commentId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response);

    dispatch({ type: UNLIKE_COMMENT, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentAction = (data) => async (dispatch) => {
  try {
    const res = await axios
      .put(
        `${BASE_API}/comments/delete/${data.commentId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => response.data);

    dispatch({ type: DELETE_COMMENT, payload: res });
  } catch (error) {
    console.log(error);
  }
};
