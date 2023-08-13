import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./UserPostCard.css";
import CommentModal from "../Comment/CommentModal";
import { useDisclosure } from "@chakra-ui/react";
import {
  likePostAction,
  savePostAction,
  unlikePostAction,
  unsavePostAction,
} from "../../redux/Post/Action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPostCard = ({ post, token, userId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = { token, postId: post?.postId };

  useEffect(() => {
    setIsPostLiked(post?.likeBy?.some((likedBy) => userId === likedBy?.id));
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
      <div className="post w-60 h-full flex items-center" onClick={handleOpenCommentModal}>
        <img 
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

export default UserPostCard;
