import React, { useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import UserPostCard from "./UserPostCard";

const UserPost = () => {
  const [activeTab, setActiveTab] = useState();
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
      <div className="flex flex-wrap gap-7">
        {[1, 1, 1, 1, 1, 1].map((item, index) => (
          <UserPostCard />
        ))}
      </div>
    </div>
  );
};

export default UserPost;
