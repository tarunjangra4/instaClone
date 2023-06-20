import React from "react";
import "./Auth.css";
import bgImage from "../../assets/home-phones-2x.png";
import Signin from "../../components/Registeration/Signin";
import { useLocation } from "react-router-dom";
import Signup from "../../components/Registeration/Signup";

const Auth = () => {
  const location = useLocation();

  return (
    <div className="">
      <div className="flex items-center justify-center h-[100vh] space-x-5">
        <div className="relative hidden lg:block">
          <div className="h-[40rem] w-[29rem]">
            <img className="h-full w-full" src={bgImage} alt="" />
            <div className="mobileWallpaper h-[34.6rem] w-[16rem] absolute top-5 right-14"></div>
          </div>
        </div>
        <div>
          <div className="w-[40vw] lg:w-[23vw]">
            {location.pathname === "/login" ? <Signin /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
