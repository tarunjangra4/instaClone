import React, { useEffect } from "react";
import UserDetails from "../components/Profile/UserDetails";
import UserPostContainer from "../components/Profile/UserPostContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowersListByUsernameAction,
  getFollowingUsersListByUsernameAction,
  getUserByUsernameAction,
} from "../redux/User/Action";
import {
  getPostsByUsernameAction,
  getSavedPostsByUsernameAction,
} from "../redux/Post/Action";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const { user, post } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (username) {
      dispatch(getUserByUsernameAction({ token, username }));
      dispatch(getPostsByUsernameAction({ token, username }));
      dispatch(getFollowersListByUsernameAction({ token, username }));
      dispatch(getFollowingUsersListByUsernameAction({ token, username }));
      dispatch(getSavedPostsByUsernameAction({ token, username }));
    } else {
      // dispatch(currUserPostAction(token));
      // dispatch(getFollowersListAction(token));
      // dispatch(getFollowingUsersListAction(token));
    }
  }, [username]);

  return (
    <div className="md:px-28 lg:px-36 xl:px-40 w-full">
      <div className="border-b border-slate-200">
        <UserDetails user={user} post={post} />
      </div>
      <div>
        <UserPostContainer token={token} username={username} />
      </div>
    </div>
  );
};

export default Profile;
