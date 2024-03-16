import { IoMenu } from "react-icons/io5";

import LetterLogo from "../assets/icons/letter_logo.png";
import userImg from "../assets/images/home/User.png";

import { Link } from "react-router-dom";

export default function LurnyHeader() {
  return (
    <div className="w-full bg-black px-[16rem] lg:px-[20rem] flex justify-between items-center py-[4rem] lg:py-[1.5rem]">
      <Link to="/lurny-category" className="select-none">
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
        <Link to="/lurny-category" className="text-white hover:text-gray-300">
          Lurny Category
        </Link>
      </div> */}
      <div className="flex items-center gap-[8rem] lg:gap-[2rem]">
        <Link to="/lurny-category">
          <img
            src={userImg}
            alt="Chrome Icon"
            className="w-[16rem] sm:w-[12rem] md:w-[10rem] lg:w-[8rem] xl:w-[4rem] rounded-[100%]"
          />
        </Link>
        <IoMenu className="text-[16rem] sm:text-[10rem] md:text-[8rem] lg:text-[6rem] xl:text-[2.5rem] text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}
