import React, { useEffect } from "react";
import SuggestionCrad from "./SuggestionCrad";
import { useDispatch, useSelector } from "react-redux";
import { suggestedUsers } from "../../redux/User/Action";

const HomeRight = () => {
  const { user } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(suggestedUsers({ token }));
  }, [user.unfollowUser, user.followUser]);

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
              <p>{user?.currUser?.name}</p>
              <p className="opacity-70">{user?.currUser?.username}</p>
            </div>
          </div>
          {/* <div>
            <p className="text-blue-700 font-semibold cursor-pointer">switch</p>
          </div> */}
        </div>
        <div className="w-full space-y-5 mt-10">
          {user?.suggestedUsers.map((item, index) => (
            <SuggestionCrad key={index} suggestedUser={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
