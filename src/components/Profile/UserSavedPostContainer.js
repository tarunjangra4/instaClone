import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  likePostAction,
  savePostAction,
  unlikePostAction,
  unsavePostAction,
} from "../../redux/Post/Action";
import CommentModal from "../Comment/CommentModal";

const UserSavedPostContainer = ({ post, currUserId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const data = { token, postId: post?.postId };

  useEffect(() => {
    setIsPostLiked(post?.likeBy?.some((likedBy) => currUserId === likedBy?.id));
  }, [post.likeBy]);

  const handlePostLike = () => {
    setIsPostLiked(true);
    dispatch(likePostAction(data));
  };

  const handlePostUnlike = () => {
    setIsPostLiked(false);
    dispatch(unlikePostAction(data));
  };

  const handleSavePost = () => {
    setIsSaved(true);
    dispatch(savePostAction(data));
  };

  const handleUnsavePost = () => {
    setIsSaved(false);
    dispatch(unsavePostAction(data));
  };

  const handleOpenCommentModal = () => {
    navigate(`/profile/${post?.postId}`);
    onOpen();
  };

  return (
    <div>
      <div className="post w-60" onClick={handleOpenCommentModal}>
        <img
          className="object-cover w-full h-full"
          src={
            post?.image ||
            "https://t4.ftcdn.net/jpg/05/46/67/67/240_F_546676739_onWkz33cgqPVB1AmHkPr6KemWVSRxjHZ.jpg"
          }
          alt=""
        />
        <div className="overlay">
          <div className="overlay-text flex justify-center gap-6">
            <div className="cursor-pointer">
              <AiFillHeart />
              <span>{post?.likeBy?.length || 0}</span>
            </div>
            <div className="cursor-pointer">
              <FaComment />
              <span>{post?.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <CommentModal
        onClose={onClose}
        isOpen={isOpen}
        isSaved={isSaved}
        isPostLiked={isPostLiked}
        handlePostLike={handlePostLike}
        handlePostUnlike={handlePostUnlike}
        handleSavePost={handleSavePost}
        handleUnsavePost={handleUnsavePost}
      />
    </div>
  );
};

export default UserSavedPostContainer;
