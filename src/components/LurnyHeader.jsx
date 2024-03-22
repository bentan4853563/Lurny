import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { ImSearch } from "react-icons/im";
import { IoMenu } from "react-icons/io5";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import LetterLogo from "../assets/icons/letter_logo.png";

export default function LurnyHeader() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      setUserData(jwtDecode(accessToken));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="w-full bg-black px-[24rem] sm:px-[12rem] flex justify-between items-center py-[4rem] lg:py-[1.5rem]">
      <Link to="/lurny/list" className="select-none">
        <img
          src={LetterLogo}
          alt="Letter logo"
          className="w-[48rem] sm:w-[32rem] md:w-[24rem] lg:w-[18rem] xl:w-[12rem]"
        />
      </Link>
      {/* <div className="flex gap-[4rem] text-[2rem] ">
        <Link to="#" className="text-white hover:text-gray-300">
          Lurny Search
        </Link>
        <Link to="/lurny/category" className="text-white hover:text-gray-300">
          Lurny Category
        </Link>
      </div> */}
      <div className="flex items-center gap-[8rem] lg:gap-[2rem]">
        {/* <Link to="/lurny/category">
          <img
            src={userImg}
            alt="Chrome Icon"
            className="w-[16rem] sm:w-[12rem] md:w-[10rem] lg:w-[8rem] xl:w-[4rem] rounded-[100%]"
          />
        </Link> */}
        <Link to="/lurny/search">
          <ImSearch className="text-[16rem] sm:text-[10rem] md:text-[8rem] lg:text-[6rem] xl:text-[3rem] text-gray-500 cursor-pointer" />
        </Link>

        <Link to="/lurny-category" className="felx items-center">
          {userData && (
            <img
              src={userData.photoURL}
              alt="User avatar"
              className="w-[16rem] sm:w-[12rem] md:w-[10rem] lg:w-[8rem] xl:w-[4rem] rounded-[100%] cursor-pointer"
            />
          )}
        </Link>
        <Menu
          menuButton={
            <MenuButton className="h-10 px-0 flex justify-center items-center focus:outline-none border-none">
              <IoMenu className="text-[16rem] sm:text-[10rem] md:text-[8rem] lg:text-[6rem] xl:text-[4rem] text-gray-500 cursor-pointer" />
            </MenuButton>
          }
          transition
          gap={8}
          align="end"
        >
          <MenuItem
            onClick={() => navigate("/lurny-category")}
            className="flex justify-center text-black text-[10rem] sm:text-[8rem] md:text-[4rem] xl:text-[2rem] px-[10rem] sm:px-[8rem] md:px-[6rem] lg:px-[4rem] py-[1rem]"
          >
            Lurnies
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/lurny/search")}
            className="flex justify-center text-black text-[10rem] sm:text-[8rem] md:text-[4rem] xl:text-[2rem] px-[10rem] sm:px-[8rem] md:px-[6rem] lg:px-[4rem] py-[1rem]"
          >
            Search
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            className="flex justify-center text-black text-[10rem] sm:text-[8rem] md:text-[4rem] xl:text-[2rem] px-[10rem] sm:px-[8rem] md:px-[6rem] lg:px-[4rem] py-[1rem]"
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
