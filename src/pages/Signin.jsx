import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { GrGoogle } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { auth } from "../firebase/config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

export default function Signin() {
  const navigate = useNavigate();

  async function handleProviderSignIn(provider) {
    try {
      const result = await signInWithPopup(auth, provider);
      await signIn(result.user.accessToken); // Assuming accessToken is available on the user object for both providers
    } catch (error) {
      console.log(error);
    }
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    handleProviderSignIn(provider);
  }

  function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.credential) {
          var token = result.credential.accessToken;
          signIn(token);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function signIn(accessToken) {
    try {
      const response = await fetch("http://localhost:5009/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        handleSuccessfulLogin(data.token);
        // Handle further logic such as redirecting to a dashboard or displaying the user info
      } else {
        throw new Error("Signin failed");
      }
    } catch (error) {
      alert("Error during signup:", error.message);
    }
  }

  const handleSuccessfulLogin = (token) => {
    console.log("456789");
    sessionStorage.setItem("token", token);
    navigate("/lurny-category");
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-black flex items-center justify-center">
      <div className="w-[160rem] sm:w-[120rem] md:w-[80rem] lg:w-[48rem] xl:w-[40rem] px-[8rem] sm:px-[4rem] xl:px-[2.5rem] py-[16rem] sm:py-[8rem] xl:py-[4rem] bg-white flex flex-col items-start gap-[10rem] md:gap-[6rem] xl:gap-[2.5rem] text-black rounded-[4rem] sm:rounded-[2rem] relative">
        <IoClose className="absolute top-[4rem] sm:top-[2rem] right-[4rem] sm:right-[2rem] text-black text-[10rem] sm:text-[8rem] md:text-[4rem] lg:text-[2.5rem] xl:text-[2rem] cursor-pointer" />
        <h1 className="text-black text-[16rem] sm-[text-12rem] md:text-[6rem] lg:text-[5rem] xl:text-[3rem] font-bold">
          Join Lurny
        </h1>
        <p className="text-black text-left text-[8rem] sm:text-[6rem] md:text-[4rem] lg:text-[3rem] xl:text-[2rem]">
          The world&lsquo;s largest collection of smart learning objects that
          help you learn efficiently.
        </p>
        <div className="flex flex-col gap-[4rem] sm:gap-[3rem] md:gap-[2rem] xl:gap-[1rem] text-black text-[10rem] sm:text-[8rem] md:text-[4rem] lg:text-[2.5rem] xl:text-[2rem]">
          <div className="flex items-center gap-[2rem] px-[4rem] sm:px-[1rem] py-[0.5rem] border border-gray-300 outline-none hover:border-[#7F52BB] rounded-md cursor-pointer ">
            <FaLinkedin />
            <span>Continu with LinkedIn</span>
          </div>
          <div
            onClick={signInWithGoogle}
            className=" flex items-center gap-[2rem] px-[4rem] sm:px-[1rem] py-[0.5rem] border border-gray-300 outline-none hover:border-[#7F52BB] rounded-md cursor-pointer hover:"
          >
            <GrGoogle />
            <span className="text-black">Continu with Goggle</span>
          </div>
          <div
            onClick={signInWithFacebook}
            className="flex items-center gap-[2rem] px-[4rem] sm:px-[1rem] py-[0.5rem] border border-gray-300 outline-none hover:border-[#7F52BB] rounded-md cursor-pointer hover:"
          >
            <FaFacebookSquare />
            <span>Continu with LinkedIn</span>
          </div>
        </div>
        <p className="text-left text-[6rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] xl:text-[1.5rem]">
          By signing up to <b>Lurny.net</b> you consent and agree to Lurny’s
          privacy policy to store, anage and process your personal information.
          To read more, please see <b>our privacy policy</b> here.
        </p>
      </div>
    </div>
  );
}
