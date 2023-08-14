import React, { useEffect, useState } from "react";
import StoryCircle from "../../components/Story/StoryCircle";
import HomeRight from "../../components/HomeRight/HomeRight";
import PostCard from "../../components/Posts/PostCard";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsersPostAction } from "../../redux/Post/Action";
import { getUserProfileAction } from "../../redux/User/Action";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [followingUsersIds, setFollowingUsersIds] = useState([]);
  const { user, post, comment } = useSelector((store) => store);
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
    console.log("useEffect");
    dispatch(findAllUsersPostAction(token));
  }, [
    post.createdPost,
    post.deletedPost,
    comment.createdComment,
    comment.deletedComment,
    post?.unlikedPost,
    post?.likedPost,
  ]);

  return (
    <div>
      <div className="flex mt-10">
        <div className="w-[60%] pl-44">
          <div className="story flex gap-3 border p-4 overflow-auto">
            {[1, 1, 1, 1, 1, 1].map((item, index) => (
              <StoryCircle key={index} />
            ))}
          </div>
          <div className="space-y-10 w-full mt-10">
            {post.usersPosts.length > 0 &&
              post.usersPosts.map((item, index) => (
                <PostCard key={index} postId={item?.postId} post={item} />
              ))}
          </div>
        </div>
        <div className="w-full h-full px-10">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};

export default Home;
