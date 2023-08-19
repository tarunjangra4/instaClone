import React from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/story/${user?.id}`);
    // navigate(`/story`);
  };

  // console.log("user ", user);

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center"
    >
      <img
        alt=""
        className="w-16 h-16 rounded-full"
        src={
          user?.image ||
          `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcbdoQ8RUTxZAJSH24mgcRQm8cj3gBPM_D3TNAVpLZ&s`
        }
      />
      <p>{user?.username}</p>
    </div>
  );
};

export default StoryCircle;
