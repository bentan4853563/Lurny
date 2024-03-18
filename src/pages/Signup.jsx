import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase/config";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { ImLinkedin2 } from "react-icons/im";

import signupImg from "../assets/images/signup.png";
import letterLogo from "../assets/icons/letter_logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  function signUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.accessToken);
        signUp(result.user.accessToken);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function signUpWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.credential) {
          var token = result.credential.accessToken;
          signUp(token);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function signUp(accessToken) {
    try {
      const response = await fetch(`${backend_url}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      // const data = await response.json();

      if (response.ok && response.status == 201) {
        toast.success("Signup successfuly. Please Signin.", {
          position: "top-right",
        });
        navigate("/signin");
      } else {
        toast.error("Already exist!", {
          position: "top-right",
        });
      }
    } catch (error) {
      alert("Error during signup:", error.message);
    }
  }

  return (
    <div className="w-full min-h-[100vh] flex font-raleway">
      <ToastContainer className="text-[2rem] text-start" />
      <div className="w-1/2 relative">
        <img
          src={signupImg}
          alt="signup image"
          className="h-full object-cover"
        />
        <img
          src={letterLogo}
          alt="logo image"
          className="absolute top-1/2 left-1/2 tansform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="w-1/2 h-full px-[8rem] py-[12rem] flex flex-col gap-[6rem] justify-center items-center">
        <span className="text-white text-[3rem]">
          Sign in or create a new account
        </span>
        <div className="w-full flex flex-col gap-[2rem] items-center ">
          <label htmlFor="email" className="text-white text-[2rem]">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/3 bg-transparent border border-violet-600 px-[1rem] py-[1rem] text-center text-[#FFC36D] text-[2rem] outline-none focus:border-[#7F52BB] focus:border rounded-lg"
          />
          <button className="bg-white hover:bg-gray-200 px-[4rem] py-[0.5rem] mt-[2rem] text-black rounded-md text-[2rem] inline-block focus:outline-none active:bg-gray-200">
            Continue
          </button>
        </div>
        <div className="w-2/3 flex items-center">
          <div className="flex-grow border-t border-gray-300 px-4"></div>
          <span className="px-[4rem] text-white text-[2rem]">or</span>
          <div className="flex-grow border-t border-gray-300 px-4"></div>
        </div>
        <div className="flex flex-col gap-[2rem]">
          <div className="bg-[#007BB5] hover:bg-[#606BB5] flex items-center gap-[2rem] px-[1rem] py-[0.5rem] rounded-md text-white text-[2rem] cursor-pointer ">
            <ImLinkedin2 className="text-[2rem]" />
            <span>Continu with LinkedIn</span>
          </div>
          <div
            onClick={signUpWithGoogle}
            className="bg-white hover:bg-gray-200 flex items-center gap-[2rem] px-[1rem] py-[0.5rem] rounded-md text-white text-[2rem] cursor-pointer hover:"
          >
            <FcGoogle className="text-[2rem]" />
            <span className="text-black">Continu with Goggle</span>
          </div>
          <div
            onClick={signUpWithFacebook}
            className="bg-[#3B5999] hover:bg-[#3B5979] flex items-center gap-[2rem] px-[1rem] py-[0.5rem] rounded-md text-white text-[2rem] cursor-pointer hover:"
          >
            <ImFacebook className="text-[2rem]" />
            <span>Continu with LinkedIn</span>
          </div>
        </div>
        <Link
          to="/signin"
          className="w-full px-[12rem] text-start text-white text-[2rem] "
        >
          Sign in?
        </Link>
        <span className="text-white text-[1.5rem] mt-[4rem]">
          By signing up to Lurny.net you consent and agree to Lurny’s privacy
          policy to store, manage and process your personal information. To read
          more, please see
        </span>
      </div>
    </div>
  );
};

export default Signup;
