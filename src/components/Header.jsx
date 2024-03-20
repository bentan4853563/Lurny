import { IoMenu } from "react-icons/io5";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import LetterLogo from "../assets/icons/letter_logo.png";
import ChromeIcon from "../assets/icons/chrome.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-black px-[20rem] flex justify-between py-[1.5rem]">
      <Link to="/" className="select-none">
        <img src={LetterLogo} alt="Letter logo" />
      </Link>
      <div className="flex items-center gap-[4rem]">
        <span className="flex items-center gap-[1rem] text-white text-[1.5rem] cursor-pointer select-none">
          <img src={ChromeIcon} alt="Chrome Icon" />
          Install Chrome Extension
        </span>
        <Menu
          menuButton={
            <MenuButton className="bg-white text-black text-[2rem] font-bold hover:bg-gray-100 flex justify-center items-center focus:outline-none border-none">
              Join Lurny
            </MenuButton>
          }
          transition
          gap={8}
          align="center"
        >
          <MenuItem className="hover:bg-white">
            <Link
              to="/lurny/list"
              className="w-full py-[0.5rem] flex justify-center text-[2rem] hover:bg-[#DCD0EC] rounded-lg"
            >
              Lurny List
            </Link>
          </MenuItem>
          <MenuItem className="hover:bg-white">
            <span className="w-full py-[0.5rem] flex justify-center text-[2rem] hover:bg-[#DCD0EC] rounded-lg">
              Home
            </span>
          </MenuItem>
          <MenuItem className="hover:bg-white">
            <span className="w-full py-[0.5rem] flex justify-center text-[2rem] hover:bg-[#DCD0EC] rounded-lg">
              Login
            </span>
          </MenuItem>
          <MenuItem className="hover:bg-white">
            <span className="w-full py-[0.5rem] flex justify-center text-[2rem] hover:bg-[#DCD0EC] rounded-lg">
              About
            </span>
          </MenuItem>
          <MenuItem className="hover:bg-white">
            <span className="w-full py-[0.5rem] flex justify-center text-[2rem] hover:bg-[#DCD0EC] rounded-lg">
              Terms of Service
            </span>
          </MenuItem>
          <MenuItem className="hover:bg-white">
            <span className="w-full py-[0.5rem] flex justify-center text-[2rem] hover:bg-[#DCD0EC] rounded-lg">
              Privacy
            </span>
          </MenuItem>
          <MenuItem className="hover:bg-white">
            <span className="w-full py-[0.5rem] px-[2rem] flex justify-center text-[1.5rem] hover:bg-[#DCD0EC] rounded-lg">
              A&nbsp;
              <span className="text-[#7030A0] font-semibold">
                CarillonMedia
              </span>
              &nbsp;Company
            </span>
          </MenuItem>
        </Menu>
        <IoMenu className="text-[4rem] text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}
