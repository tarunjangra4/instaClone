import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./UserPostCard.css";

const UserPostCard = () => {
  return (
    <div>
      <div className="post w-60">
        <img
          src="https://t4.ftcdn.net/jpg/05/46/67/67/240_F_546676739_onWkz33cgqPVB1AmHkPr6KemWVSRxjHZ.jpg"
          alt=""
        />
        <div className="overlay">
          <div className="overlay-text flex justify-center gap-6">
            <div className="cursor-pointer">
              <AiFillHeart />
              <span>10</span>
            </div>
            <div className="cursor-pointer">
              <FaComment />
              <span>10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
