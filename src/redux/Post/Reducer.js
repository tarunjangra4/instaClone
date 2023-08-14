const initialValue = {
  createdPost: null,
  currUserPosts: [],
  usersPosts: [],
  deletedPost: null,
  likedPost: null,
  unlikedPost: null,
  savedPost: null,
  unsavedPost: null,
  singlePost: null,
  savedPosts: [],
  postsOfSelectedUser: [],
};

export const PostReducer = (store = initialValue, { type, payload }) => {
  if (type === "CREATE_NEW_POST") {
    return { ...store, createdPost: payload };
  } else if (type === "GET_CURR_USER_POSTS") {
    return { ...store, currUserPosts: payload };
  } else if (type === "GET_USERS_POSTS") {
    return { ...store, usersPosts: payload };
  } else if (type === "DELETE_POST") {
    return { ...store, deletedPost: payload };
  } else if (type === "LIKE_POST") {
    return { ...store, likedPost: payload };
  } else if (type === "UNLIKE_POST") {
    return { ...store, unlikedPost: payload };
  } else if (type === "SAVE_POST") {
    return { ...store, savedPost: payload };
  } else if (type === "UNSAVE_POST") {
    return { ...store, unsavedPost: payload };
  } else if (type === "GET_SINGLE_POST") {
    return { ...store, singlePost: payload };
  } else if (type === "GET_SAVED_POSTS") {
    return { ...store, savedPosts: payload };
  } else if (type === "GET_POSTS_BY_USERNAME") {
    return { ...store, postsOfSelectedUser: payload };
  }

  return { ...store };
};
