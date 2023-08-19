import React, { useEffect, useState } from "react";
import StoryCircle from "../../components/Story/StoryCircle";
import HomeRight from "../../components/HomeRight/HomeRight";
import PostCard from "../../components/Posts/PostCard";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsersPostAction } from "../../redux/Post/Action";
import {
  getFollowingUsersListAction,
  getUserProfileAction,
  getUsersByUserIds,
} from "../../redux/User/Action";
import { hasStory } from "../../Config/Logic";
import CreateStory from "../../components/Story/CreateStory";
import { getFollowingUserStory } from "../../redux/Story/Action";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [usersHasStory, setUsersHasStory] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [followingUsersIds, setFollowingUsersIds] = useState([]);
  const { user, post, comment, story } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  localStorage.setItem("username", null);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfileAction(token));
    }
  }, [token]);

  useEffect(() => {
    // const newIds = user.currUser?.following?.map((user) => user.id) || [];
  }, [user.currUser]); // when current user change then userIds will change

  useEffect(() => {
    dispatch(findAllUsersPostAction(token));
    dispatch(getFollowingUsersListAction(token));
  }, [
    post.createdPost,
    post.deletedPost,
    comment.createdComment,
    comment.deletedComment,
    post?.unlikedPost,
    post?.likedPost,
  ]);

  useEffect(() => {
    const userIds = [];
    user?.followingUsersList?.forEach((user) => {
      if (user?.id) {
        userIds.push(user?.id);
      }
    });
    if (userIds && userIds?.length > 0) {
      userIds && dispatch(getFollowingUserStory({ token, userIds }));
    }
  }, [user?.followingUsersList]);

  useEffect(() => {
    let users = user?.followingUsersList;
    if (!users?.some((user) => user?.id === user?.currUser?.id)) {
      users = [...users, user?.currUser];
    }
    if (users?.length > 0 && story?.allStories?.length > 0) {
      setUsersHasStory(hasStory(users, story?.allStories));
    }
    // setStories(story?.allStories);
  }, [story?.allStories]);

  // console.log("stories ", story?.allStories);

  return (
    <div>
      <div className="flex mt-10">
        <div className="w-[60%] pl-44">
          <div className="story flex gap-3 border p-4 overflow-auto">
            <div className="flex">
              <CreateStory />
              {usersHasStory?.length > 0 &&
                usersHasStory?.map((item, index) => (
                  <StoryCircle key={index} user={item} />
                ))}
              {/* {stories?.length > 0 &&
                stories?.map((item, index) => (
                  <StoryCircle key={index} user={item} />
                ))} */}
              {/* {[1, 2, 2, 2, 2, 2]?.map((item, index) => (
                <StoryCircle key={index} />
              ))} */}
            </div>
          </div>
          <div className="space-y-10 w-full mt-10">
            {post.usersPosts.length > 0 &&
              post.usersPosts.map((item, index) => (
                <PostCard key={index} postId={item?.postId} post={item} />
              ))}
          </div>
        </div>
        <div className="w-[40%] h-full px-10">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};

export default Home;
