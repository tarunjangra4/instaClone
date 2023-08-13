import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentAction,
  likeCommentAction,
  unlikeCommentAction,
} from "../../redux/Comment/Action";
import { BsThreeDots } from "react-icons/bs";
import { deleteSingleCommentApi } from "../../Config/api";

const CommentCard = ({ comment, postId }) => {
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  useEffect(() => {
    // setIsCommentLiked(isCommentLikedByUser(comment, user?.currUser?.id));
    setIsCommentLiked(
      comment?.likedBy?.some((likedBy) => user?.currUser?.id === likedBy?.id)
    );
  }, [user?.currUser]);

  const data = {
    token,
    commentId: comment?.commentId,
    postId,
  };

  const handleLikeComment = () => {
    setIsCommentLiked(true);
    dispatch(likeCommentAction(data));
  };

  const handleUnlikeComment = () => {
    setIsCommentLiked(false);
    dispatch(unlikeCommentAction(data));
  };

  const handleDeleteComment = () => {
    dispatch(deleteCommentAction(data));
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full"
              src={
                comment?.user?.userImage ||
                "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
              }
              alt=""
            />
          </div>
          <div className="ml-3">
            <p>
              <span className="font-semibold">{comment?.user?.username}</span>
              <span className="ml-2">{comment?.content}</span>
            </p>
            <div className="flex items-end space-x-3 text-xs opacity-60 pt-1">
              <span>{timeDifference(comment?.createdAt)}</span>
              {comment?.likedBy?.length > 0 && (
                <span>{comment?.likedBy?.length} likes</span>
              )}
              <span
                className="relative w-10"
                onMouseOver={() => setShowDropDown(true)}
                onMouseLeave={() => setShowDropDown(false)}
              >
                <BsThreeDots className="cursor-pointer" />
                <div className="absolute bottom-3" style={{ left: "-10px" }}>
                  {showDropdown && (
                    <p
                      onClick={handleDeleteComment}
                      className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"
                    >
                      Delete
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
        <div>
          {isCommentLiked ? (
            <AiFillHeart
              onClick={handleUnlikeComment}
              className="text-xs hover:opacity-50 cursor-pointer text-red-600"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleLikeComment}
              className="text-xs hover:opacity-50 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
