import React from "react";
import UserDetails from "../components/Profile/UserDetails";
import UserPostContainer from "../components/Profile/UserPostContainer";

const Profile = () => {
  return (
    <div className="px-40">
      <div className="border-b border-slate-200">
        <UserDetails />
      </div>
      <div>
        <UserPostContainer />
      </div>
    </div>
  );
};

export default Profile;
