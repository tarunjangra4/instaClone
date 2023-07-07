const initialValue = {
  reqUser: null,
  findByUsername: null,
  findUsersByUserIds: [],
  followUser: null,
  unfollowUser: null,
  searchUser: null,
  updatedUser: null,
};

export const UserReducer = (store = initialValue, { type, payload }) => {
  if (type === "REQ_USER") {
    return { ...store, reqUser: payload };
  } else if (type === "GET_USER_BY_USERNAME") {
    return { ...store, findUserByUsername: payload };
  } else if (type === "GET_USERS_BY_USER_IDS") {
    return { ...store, findUsersByUserIds: payload };
  } else if (type === "FOLLOW_USER") {
    return { ...store, followUser: payload };
  } else if (type === "UNFOLLOW_USER") {
    return { ...store, unfollowUser: payload };
  } else if (type === "SEARCH_USER") {
    return { ...store, searchUser: payload };
  } else if (type === "UPDATE_USER") {
    return { ...store, updatedUser: payload };
  }

  return store;
};
