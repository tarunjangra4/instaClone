import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../HomePage/Home";
import Profile from "../Profile";
import Story from "../Story/Story";
import Auth from "../Auth/Auth";

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
          <div className="w-[80%]">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/story" element={<Story />}></Route>
              <Route path="/comment/:postId" element={<Home />}></Route>
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default Router;
