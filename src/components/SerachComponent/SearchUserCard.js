import React from "react";
import { useNavigate } from "react-router-dom";

const SearchUserCard = ({ user, setIsSearchVisible, setActiveTab }) => {
  const navigate = useNavigate();
  // console.log("search ", user);
  return (
    <div
      className="py-2 cursor-pointer"
      onClick={() => {
        setIsSearchVisible(false);
        setActiveTab("Home");
        navigate(`/${user?.username}`);
      }}
    >
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={
            user?.userImage ||
            `https://cdn.pixabay.com/photo/2023/06/02/05/34/birds-8034821_1280.jpg`
          }
          alt=""
        />
        <div className="ml-3">
          <p>{user?.name}</p>
          <p className="opacity-70">{user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchUserCard;
