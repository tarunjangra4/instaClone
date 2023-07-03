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
  const [userIds, setUserIds] = useState([]);
  const { user, post } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getUserProfileAction(token));
    }
  }, [token]);

  useEffect(() => {
    const newIds = user.reqUser?.following?.map((user) => user.id) || [];
    setUserIds([user.reqUser?.id, ...newIds]);
  }, [user.reqUser]);

  useEffect(() => {
    const data = {
      token,
      userIds: userIds.join(","),
    };
    dispatch(findAllUsersPostAction(data));
  }, [userIds, post.createdPost, post.deletedPost]);
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
                <PostCard key={index} post={item} />
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
