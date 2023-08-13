import React, { useEffect, useState } from "react";
import UserDetails from "../components/Profile/UserDetails";
import UserPostContainer from "../components/Profile/UserPostContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  findUserByUsernameAction,
  getFollowersListAction,
  getFollowingUsersListAction,
  getUserProfileAction,
} from "../redux/User/Action";
import {
  currUserPostAction,
  findAllUsersPostAction,
  findSinglePostByIdAction,
} from "../redux/Post/Action";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const { user, post } = useSelector((store) => store);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (username) {
      dispatch(findUserByUsernameAction({ token, username }));
    } else {
      setUserDetails(user?.currUser);
    }
  }, []);

  useEffect(() => {
    setUserDetails(user?.findByUsername);
  }, [user?.findByUsername]);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfileAction(token));
    }
  }, []);

  useEffect(() => {
    dispatch(currUserPostAction(token));
    dispatch(getFollowersListAction(token));
    dispatch(getFollowingUsersListAction(token));
  }, []);

  return (
    <div className="px-40">
      <div className="border-b border-slate-200">
        <UserDetails user={userDetails} post={post} />
      </div>
      <div>
        <UserPostContainer token={token} username={username} />
      </div>
    </div>
  );
};

export default Profile;
