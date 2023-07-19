const initialValue = {
  createdComment: null,
  postComments: null,
  likedComment: null,
  unlikedComment: null,
  deletedComment: null,
};

export const CommentReducer = (store = initialValue, { type, payload }) => {
  if (type === "CREATE_COMMENT") {
    return { ...store, createdComment: payload };
  } else if (type === "GET_POST_COMMENT") {
    return { ...store, postComments: payload };
  } else if (type === "LIKE_COMMENT") {
    return { ...store, likedComment: payload };
  } else if (type === "UNLIKE_COMMENT") {
    return { ...store, unlikedComment: payload };
  } else if (type === "DELETE_COMMENT") {
    return { ...store, deletedComment: payload };
  }

  return { ...store };
};
