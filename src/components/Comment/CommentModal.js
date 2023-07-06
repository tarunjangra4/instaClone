import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import CommentCard from "./CommentCard";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import "./CommentModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  findPostCommentAction,
} from "../../redux/Comment/Action";
import { useParams } from "react-router-dom";
import { findPostByIdAction } from "../../redux/Post/Action";
import { timeDifference } from "../../Config/Logic";

const CommentModal = (props) => {
  const {
    onClose,
    isOpen,
    isSaved,
    isPostLiked,
    handlePostLike,
    handleSavePost,
    handleUnsavePost,
  } = props;

  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { postId } = useParams();
  const { comment, post, user } = useSelector((store) => store);

  // console.log("comment ", comment);

  useEffect(() => {
    const data = {
      token,
      postId,
    };
    if (postId) {
      // how to map comment likedbyusers
      dispatch(findPostByIdAction(data));
    }
  }, [comment.createdComment, postId, comment.likeComment]);

  // useEffect(() => {
  //   const data = {
  //     token,
  //     postId,
  //   };
  //   if (postId) {
  //     dispatch(findPostCommentAction(data));
  //   }
  // }, [postId]);

  return (
    <div>
      <Modal
        size={"4xl"}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh]">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  alt=""
                  className="max-h-full w-full"
                  src={post?.singlePost?.image}
                />
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="flex justify-between items-center py-5 ">
                  <div className="flex items-center">
                    <div>
                      <img
                        alt=""
                        className="w-9 h-9 rounded-full"
                        src={
                          user?.reqUser?.userImage ||
                          "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                        }
                      />
                    </div>
                    <div className="ml-2">
                      <p>{user?.reqUser?.username}</p>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>
                <hr />
                <div className="comment">
                  {post?.singlePost?.comments?.map((item, ind) => (
                    <CommentCard key={ind} comment={item} />
                  ))}
                </div>
                <div className="absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full py-2">
                    <div className="flex items-center space-x-2">
                      {isPostLiked ? (
                        <AiFillHeart
                          className="text-red-600 text-2xl hover:opacity-50 cursor-pointer"
                          onClick={handlePostLike}
                        />
                      ) : (
                        <AiOutlineHeart
                          className="text-xl hover:opacity-50 cursor-pointer"
                          onClick={handlePostLike}
                        />
                      )}
                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
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
                  <div className="w-full pb-2 text-left">
                    {post.singlePost?.likedByUsers?.length > 0 && (
                      <p>{post.singlePost?.likedByUsers?.length} likes</p>
                    )}
                    <p className="opacity-50">
                      {timeDifference(post?.singlePost?.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center px-4 py-2 space-x-2">
                    <BsEmojiSmile />
                    <input
                      className="commentInput"
                      type="text"
                      placeholder="Add a comment..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const data = {
                            token,
                            postId,
                            data: {
                              content: commentContent,
                            },
                          };
                          if (
                            commentContent.length > 0 &&
                            dispatch(createCommentAction(data))
                          )
                            setCommentContent("");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
