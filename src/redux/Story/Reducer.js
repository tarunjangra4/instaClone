const initialValue = {
  createdStory: null,
  allStories: [],
  userStories: [],
  userHasStories: [],
};

export const StoryReducer = (store = initialValue, { type, payload }) => {
  if (type === "CREATE_STORY") {
    return { ...store, createdStory: payload };
  } else if (type === "FETCH_FOLLOWING_USER_STORY") {
    return { ...store, allStories: payload };
  } else if (type === "FETCH_USERS_HAS_STORY") {
    return { ...store, userHasStories: payload };
  } else if (type === "FETCH_USER_STORY") {
    return { ...store, userStories: payload };
  }
  return { ...store };
};
