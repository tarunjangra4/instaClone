import React from "react";
import { TbCircleDashed } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { FollowingUsersPopup } from "./FollowingUsersPopup";
import FollowingUsers from "./FollowingUsers";
import Followers from "./Followers";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ user, post }) => {
  // const { user, post } = useSelector((store) => store);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  // console.log("userDetail ", user);
  // console.log("post ", post);

  return (
    <div className="py-10">
      <div className="flex">
        <div>
          <img
            className="w-32 h-32 rounded-full"
            src={`${
              user?.findByUsername?.userImage ||
              "https://wallpapers.com/images/high/fortnite-profile-pictures-vnfcslvf7fhn7rro.webp"
            }`}
            alt=""
          />
        </div>
        <div className="px-20">
          <div className="flex items-center gap-6">
            <p className="text-lg font-medium">
              {user?.findByUsername?.username}
            </p>
            {user?.findByUsername?.id == loggedInUserId && (
              <>
                <button
                  className="border border-black rounded-md px-4 text-sm py-1 font-semibold"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </button>
                <TbCircleDashed className="text-xl font-bold cursor-pointer" />
              </>
            )}
          </div>
          <div className="flex mt-3 gap-7">
            <p>
              <span className="font-semibold mr-1">
                {post?.postsOfSelectedUser?.length || 0}
              </span>
              <span className="text-sm font-medium">Posts</span>
            </p>
            <Followers followersList={user?.followersListByUsername} />
            <FollowingUsers
              followingUsersList={user?.followingUsersListByUsername}
            />
          </div>
          <div className="mt-3">
            <p className="text-left font-semibold">
              {user?.findByUsername?.name}
            </p>
          </div>
          <div>
            <p className="font-light text-left">
              {user?.findByUsername?.bio || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
