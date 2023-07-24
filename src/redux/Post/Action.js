import {
  CREATE_NEW_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
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
    const res = await fetch(`${BASE_API}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body: JSON.stringify(data.data),
    });

    const post = await res.json();
    dispatch({ type: CREATE_NEW_POST, payload: post });
  } catch (error) {
    console.log(error);
  }
};

export const findAllUsersPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/posts/following/${data?.userIds}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });
    const posts = await res.json();
    dispatch({ type: GET_USER_POST, payload: posts });
  } catch (error) {
    console.log(error);
  }
};

// export const currUserPostAction = (data) => async (dispatch) => {
//   try {
//     const res = await fetch(`${BASE_API}/posts/following/${data.userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + data.token,
//       },
//     });

//     const posts = await res.json();
//     dispatch({ type: REQ_USER_POST, payload: posts });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const findSinglePostByIdAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/posts/singlePost/${data.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });

    const post = await res.json();
    dispatch({ type: GET_SINGLE_POST, payload: post });
  } catch (error) {
    console.log(error);
  }
};

export const likePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/posts/like/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });

    const post = await res.json();
    dispatch({ type: LIKE_POST, payload: post });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/posts/unlike/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });

    // const res = await axios
    //   .put(
    //     `${BASE_API}/posts/unlike/${data.postId}`,
    //     {},
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + data.token,
    //       },
    //     }
    //   )
    //   .then((response) => response);

    const post = await res.json();
    dispatch({ type: UNLIKE_POST, payload: post });
  } catch (error) {
    console.log(error);
  }
};

export const savePostAction = (data) => async (dispatch) => {
  try {
    // const res = await fetch(`${BASE_API}/posts/save_post/${data.postId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + data.token,
    //   },
    // });
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
    // const res = await fetch(`${BASE_API}/posts/unsave_post/${data.postId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + data.token,
    //   },
    // });

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
