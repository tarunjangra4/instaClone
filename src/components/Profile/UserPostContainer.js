import React, { useEffect, useId, useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import UserPostCard from "./UserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPostsAction } from "../../redux/Post/Action";
import UserSavedPostContainer from "./UserSavedPostContainer";
import { useParams } from "react-router-dom";

const UserPostContainer = ({ token, username }) => {
  const [activeTab, setActiveTab] = useState("Post");
  const { user, post } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedPostsAction(token));
  }, [user?.currUser]);

  // console.log(activeTab, post?.savedPosts);
  console.log("post ", post);

  const tabs = [
    {
      tab: "Post",
      icon: <AiOutlineTable />,
      activeTab: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoAddLine />,
    },
    {
      tab: "Saved",
      icon: <BiBookmark />,
    },
    {
      tab: "Tagged",
      icon: <AiOutlineUser />,
    },
  ];
  return (
    <div>
      <div className="flex gap-14">
        {tabs.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 px-5 cursor-pointer py-2.5 ${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            }`}
            onClick={() => setActiveTab(item.tab)}
          >
            {item.icon}
            <p>{item.tab}</p>
          </div>
        ))}
      </div>
      {activeTab === "Post" ? (
        <div className="flex flex-wrap gap-7">
          {post?.postsOfSelectedUser?.length > 0 ? (
            post?.postsOfSelectedUser?.map((item, index) => (
              <UserPostCard
                key={index}
                post={item}
                token={token}
                currUserId={user?.currUser?.id}
              />
            ))
          ) : (
            <div className="w-full mt-10">
              User Does not have any posts yet.
            </div>
          )}
        </div>
      ) : activeTab === "Saved" ? (
        <div className="flex flex-wrap gap-7">
          {post?.savedPostsOfSelectedUser?.map((item, index) => (
            <UserSavedPostContainer
              key={index}
              post={item}
              currUserId={user?.currUser?.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default UserPostContainer;
