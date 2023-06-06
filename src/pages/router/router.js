import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "../HomePage/Home";
import Profile from "../Profile";

const Router = () => {
  return (
    <div className="flex">
      <div className="w-[20%] border border-l-slate-500 pl-10">
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Router;
