const initialValue = {
  currUser: null,
  findByUsername: null,
  getUsersByUserIds: [],
  followUser: null,
  unfollowUser: null,
  searchUser: null,
  updatedUser: null,
  suggestedUsers: [],
  followersList: [],
  followingUsersList: [],
  followersListByUsername: [],
  followingUsersListByUsername: [],
};

export const UserReducer = (store = initialValue, { type, payload }) => {
  if (type === "REQ_USER") {
    return { ...store, currUser: payload };
  } else if (type === "GET_USER_BY_USERNAME") {
    return { ...store, findByUsername: payload };
  } else if (type === "GET_USERS_BY_USER_IDS") {
    return { ...store, getUsersByUserIds: payload };
  } else if (type === "FOLLOW_USER") {
    return { ...store, followUser: payload };
  } else if (type === "UNFOLLOW_USER") {
    return { ...store, unfollowUser: payload };
  } else if (type === "SEARCH_USER") {
    return { ...store, searchUser: payload };
  } else if (type === "UPDATE_USER") {
    return { ...store, updatedUser: payload };
  } else if (type === "SUGGESTED_USER") {
    return { ...store, suggestedUsers: payload };
  } else if (type === "FOLLOWERS_LIST") {
    return { ...store, followersList: payload };
  } else if (type === "FOLLOWING_USERS_LIST") {
    return { ...store, followingUsersList: payload };
  } else if (type === "REMOVE_FOLLOWER") {
    return { ...store, followUser: payload };
  } else if (type === "FOLLOWERS_LIST_BY_USERNAME") {
    return { ...store, followersListByUsername: payload };
  } else if (type === "FOLLOWING_USERS_LIST_BY_USERNAME") {
    return { ...store, followingUsersListByUsername: payload };
  }

  return store;
};
