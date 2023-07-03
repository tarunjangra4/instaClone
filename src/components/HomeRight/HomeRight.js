import React from "react";
import SuggestionCrad from "./SuggestionCrad";

const HomeRight = () => {
  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <img
                alt=""
                className="w-12 h-12 rounded-full"
                src="https://img.freepik.com/free-photo/blossom-floral-bouquet-decoration-colorful-beautiful-flowers-background-garden-flowers-plant-pattern-wallpapers-greeting-cards-postcards-design-wedding-invites_90220-1103.jpg"
              />
            </div>
            <div className="ml-3">
              <p>full name</p>
              <p className="opacity-70">username</p>
            </div>
          </div>
          <div>
            <p className="text-blue-700 font-semibold cursor-pointer">switch</p>
          </div>
        </div>
        <div className="w-full space-y-5 mt-10">
          {[1, 1, 1, 1, 1].map((item, index) => (
            <SuggestionCrad key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
