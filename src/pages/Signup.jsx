import signupImg from "../assets/images/signup.png";
import letterLogo from "../assets/icons/letter_logo.png";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-[100vh] font-raleway">
      <div className="w-1/2 relative">
        <img
          src={signupImg}
          alt="signup image"
          className="w-full h-full object-cover"
        />
        <img
          src={letterLogo}
          alt="logo image"
          className="absolute top-1/2 mx-auto"
        />
      </div>
      <div className="w-1/2 h-full flex flex-col p-[8rem]">
        <span className="text-white text-[2rem]">
          Sign in or create a new account
        </span>
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-center text-[#FFC36D] outline-none focus:border-[#7F52BB] focus:border"
          />
          <button className="bg-white px-[4rem] text-black rounded-md">
            Continue
          </button>
        </div>
        <div className="w-2/3 flex items-center">
          <div className="flex-grow border-t border-gray-300 px-4"></div>
          <span className="mx-4 my-4 text-gray-600 text-md">or</span>
          <div className="flex-grow border-t border-gray-300 px-4"></div>
        </div>
        <div className="w-[100rem] flex felx-col"></div>
      </div>
    </div>
  );
};

export default Signup;
