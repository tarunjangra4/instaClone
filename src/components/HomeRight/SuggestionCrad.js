import React from "react";

const SuggestionCrad = ({ suggestedUser }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          className="h-9 w-9 rounded-full"
          alt=""
          src="https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_1280.jpg"
        />
        <div className="ml-2 text-left">
          <p className="text-sm font-semibold">{suggestedUser?.username}</p>
          <p className="text-xs font-semibold opacity-70">
            {suggestedUser?.isFollowing && "Follows you"}
          </p>
        </div>
      </div>
      <p className="text-blue-700 font-semibold text-sm cursor-pointer">
        Follow
      </p>
    </div>
  );
};

export default SuggestionCrad;
