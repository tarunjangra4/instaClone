import React from "react";

const SuggestionCrad = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          className="h-9 w-9 rounded-full"
          alt=""
          src="https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_1280.jpg"
        />
        <div className="ml-2">
          <p className="text-sm font-semibold">username</p>
          <p className="text-sm font-semibold opacity-70 cursor-pointer">
            Follows you
          </p>
        </div>
      </div>
      <p className="text-blue-700 font-semibold text-sm">Follow</p>
    </div>
  );
};

export default SuggestionCrad;
