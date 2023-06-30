import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import "./PostCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import CommentModal from "../Comment/CommentModal";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  likePostAction,
  savePostAction,
  unlikePostAction,
  unsavePostAction,
} from "../../redux/Post/Action";
import { findIsPostLikedByUser, findIsPostSaved } from "../../Config/Logic";
import { Navigate, useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const navigate = useNavigate();

  const data = { token, postId: post?.id };

  const handleSavePost = () => {
    setIsSaved(true);
    dispatch(savePostAction(data));
  };

  const handleUnsavePost = () => {
    setIsSaved(false);
    dispatch(unsavePostAction(data));
  };

  const handlePostLike = () => {
    setIsPostLiked(true);
    dispatch(likePostAction(data));
  };

  const handlePostUnlike = () => {
    setIsPostLiked(false);
    dispatch(unlikePostAction(data));
  };

  const handleClick = () => {
    setShowDropDown(!showDropdown);
  };

  const handleOpenCommentModal = () => {
    navigate(`/comment/${post.id}`);
    onOpen();
  };

  useEffect(() => {
    setIsPostLiked(findIsPostLikedByUser(post, user.reqUser.id));
    setIsSaved(findIsPostSaved(user.reqUser, post.id));
  }, [post.likedByUsers, user.reqUser]);

  return (
    <div>
      <div className="border rounded-md mx-10">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex">
            <div>
              <img
                alt=""
                className="h-12 w-12 rounded-full"
                src={
                  post?.user?.userImage ||
                  "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                }
              />
            </div>
            <div className="ml-3">
              <p className="flex items-center font-semibold text-sm">
                {post?.user?.username}
                <BsDot className="font-thin text-[#adadad]" />
                <span className="font-thin text-sm ml-2">Time</span>
              </p>
              <p className="font-thin text-sm text-left">{post?.location}</p>
            </div>
          </div>
          <div>
            <BsThreeDots className="dots" onClick={handleClick} />
            <div className="dropdown-content">
              {showDropdown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <img alt="" className="w-full" src={post?.image} />
        </div>
        <div className="flex justify-between items-center w-full px-4 py-2">
          <div className="flex items-center space-x-2">
            {isPostLiked ? (
              <AiFillHeart
                className="text-red-600 text-2xl hover:opacity-50 cursor-pointer"
                onClick={handlePostUnlike}
              />
            ) : (
              <AiOutlineHeart
                className="text-xl hover:opacity-50 cursor-pointer"
                onClick={handlePostLike}
              />
            )}
            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl hover:opacity-50 cursor-pointer"
            />
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>
          <div>
            {isSaved ? (
              <BsBookmarkFill
                className="text-xl hover:opacity-50 cursor-pointer"
                onClick={handleUnsavePost}
              />
            ) : (
              <BsBookmark
                className="text-xl hover:opacity-50 cursor-pointer"
                onClick={handleSavePost}
              />
            )}
          </div>
        </div>
        <div className="w-full pb-2 px-4 text-left">
          {post?.likedByUsers?.length > 0 && (
            <p>{post?.likedByUsers?.length}</p>
          )}

          {post?.comments.length > 0 && (
            <p className="opacity-50 cursor-pointer">
              View All {post?.comments.length} comments
            </p>
          )}
        </div>
        <div className="border border-t w-full">
          <div className="flex items-center px-4 py-2 space-x-2">
            <BsEmojiSmile />
            <input
              className="commentInput"
              type="text"
              placeholder="Add a comment..."
            />
          </div>
        </div>
      </div>
      <CommentModal
        onClose={onClose}
        isOpen={isOpen}
        isSaved={isSaved}
        isPostLiked={isPostLiked}
        handlePostLike={handlePostLike}
        handleSavePost={handleSavePost}
        handleUnsavePost={handleUnsavePost}
      />
    </div>
  );
};

export default PostCard;
