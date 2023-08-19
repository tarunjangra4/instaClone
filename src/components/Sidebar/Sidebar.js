import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
// import {
//   AiOutlineHome,
//   AiOutlineSearch,
//   AiOutlineMessage,
//   AiOutlineHeart,
//   AiOutlinePlusCircle,
// } from "react-icons/ai";
// import { MdExplore } from "react-icons/md";
// import { RiVideoLine } from "react-icons/ri";
// import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { menu } from "./SidebarConfig";
import CreatePostModal from "../Posts/CreatePostModal";
import { useDisclosure } from "@chakra-ui/react";
import SerachComponent from "../SerachComponent/SearchComponent";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Profile") {
      navigate(`/${user?.currUser?.username}`);
    } else if (tab === "Home") {
      navigate("/");
    } else if (tab === "Explore") {
      navigate("/explore");
    } else if (tab === "Create") {
      onOpen();
    }
    if (tab === "Search") {
      setIsSearchVisible(true);
    } else {
      setIsSearchVisible(false);
    }
  };
  return (
    <div className="sticky top-0 h-[100vh] flex">
      <div className={`${activeTab === "Search" ? "pl-5" : "px-10"}`}>
        {activeTab !== "Search" && (
          <div className="py-6">
            <BsInstagram className="md:hidden" />
            <p className="text-left font-semibold text-xl">Instagram</p>
          </div>
        )}
        <div className="flex flex-col gap-2 h-[80vh] mt-4">
          {menu.map((item, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer py-3"
              onClick={() => handleTabClick(item.title)}
            >
              {activeTab === item.title ? item.activeIcon : item.icon}
              {activeTab !== "Search" && (
                <p
                  className={`text-lg ${
                    activeTab === item.title ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.title}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <GoThreeBars className="text-3xl mr-1" />
          {activeTab !== "Search" && (
            <p className="text-lg font-medium">More</p>
          )}
        </div>
      </div>

      <CreatePostModal onClose={onClose} isOpen={isOpen} />
      {isSearchVisible && (
        <SerachComponent
          setIsSearchVisible={setIsSearchVisible}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default Sidebar;
