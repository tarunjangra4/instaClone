import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import { useDispatch, useSelector } from "react-redux";
import {
  likeCommentAction,
  unlikeCommentAction,
} from "../../redux/Comment/Action";

const CommentCard = ({ comment }) => {
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  useEffect(() => {
    console.log(comment);
    // console.log(user?.reqUser);
    setIsCommentLiked(isCommentLikedByUser(comment, user?.reqUser?.id));
  }, [user?.reqUser]);

  const data = {
    token,
    commentId: comment?.id,
  };

  const handleLikeComment = () => {
    setIsCommentLiked(true);
    dispatch(likeCommentAction(data));
  };

  const handleUnlikeComment = () => {
    setIsCommentLiked(false);
    dispatch(unlikeCommentAction(data));
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
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-1">
              <span>{timeDifference(comment?.createdAt)}</span>
              {comment?.likedByUsers?.length > 0 && (
                <span>{comment?.likedByUsers?.length} likes</span>
              )}
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
