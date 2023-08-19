import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../HomePage/Home";
import Profile from "../Profile";
import Story from "../Story/Story";
import Auth from "../Auth/Auth";
import EditProfile from "../../components/EditProfile/EditProfile";
import NewEditProfile from "../../components/EditProfile/NewEditProfile";

const Router = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/login" || location.pathname === "/signup" ? (
        <div>
          <Routes>
            <Route path="/signup" element={<Auth />}></Route>
            <Route path="/login" element={<Auth />}></Route>
          </Routes>
        </div>
      ) : (
        <div className="flex">
          <div className="w-[20%] border border-l-slate-500">
            <Sidebar />
          </div>
          <div className="w-[80%] flex justify-center">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              {/* <Route path="/profile" element={<Profile />}></Route> */}
              <Route path="/:username" element={<Profile />}></Route>
              <Route path="/story/:userId" element={<Story />}></Route>
              <Route path="/comment/:postId" element={<Home />}></Route>
              <Route path="/profile/:postId" element={<Profile />}></Route>
              <Route path="/following" element={<Profile />}></Route>
              <Route path="/followers" element={<Profile />}></Route>
              {/* <Route path="/edit-profile" element={<EditProfile />}></Route> */}
              <Route path="/edit-profile" element={<NewEditProfile />}></Route>
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default Router;
