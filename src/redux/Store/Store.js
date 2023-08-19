import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { AuthReducer } from "../Auth/reducer";
import thunk from "redux-thunk";
import { UserReducer } from "../User/Reducer";
import { PostReducer } from "../Post/Reducer";
import { CommentReducer } from "../Comment/Reducer";
import { StoryReducer } from "../Story/Reducer";

const rootReducers = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  post: PostReducer,
  comment: CommentReducer,
  story: StoryReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
