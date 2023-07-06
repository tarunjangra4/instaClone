import React from "react";
import { TbCircleDashed } from "react-icons/tb";

const UserDetails = () => {
  return (
    <div className="py-10">
      <div className="flex">
        <div>
          <img
            className="w-32 h-32 rounded-full"
            src="https://wallpapers.com/images/high/fortnite-profile-pictures-vnfcslvf7fhn7rro.webp"
            alt=""
          />
        </div>
        <div className="px-20">
          <div className="flex items-center gap-6">
            <p className="text-lg font-medium">UserName</p>
            <button className="border border-black rounded-md px-4 text-sm py-1 font-semibold">
              Edit Profile
            </button>
            <TbCircleDashed className="text-xl font-bold cursor-pointer" />
          </div>
          <div className="flex mt-3 gap-7">
            <p>
              <span className="font-semibold mr-1">10</span>
              <span className="text-sm font-medium">Posts</span>
            </p>
            <p>
              <span className="font-semibold mr-1">50</span>
              <span className="text-sm font-medium">Followers</span>
            </p>
            <p>
              <span className="font-semibold mr-1">50</span>
              <span className="text-sm font-medium">Following</span>
            </p>
          </div>
          <div className="mt-3">
            <p className="text-left font-semibold">Full Name</p>
          </div>
          <div>
            <p className="font-light text-left">Bio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
