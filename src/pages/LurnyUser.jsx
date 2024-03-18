import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { TfiShare } from "react-icons/tfi";
import { IoIosArrowForward } from "react-icons/io";

import { useLurnyStore } from "../stores/lurnyStore";

import LurnyHeader from "../components/LurnyHeader";
import LurnyItem from "../components/LurnyItem";

import defaultImg from "../assets/images/Lurny/default.png";
import UserPan from "../components/UserPan";

const LurnyUser = () => {
  const { lurnies, addLurny, setLurnies, shareLurny } = useLurnyStore();
  const [tempData, setTempData] = useState(null);
  const [showSidePan, setShowSidePan] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      setUserData(jwtDecode(accessToken));
    }
  }, []);

  // const backend_url = "https://6faf-88-99-162-157.ngrok-free.app";
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (userData) {
      myLurnies();
    }
  }, [userData]);

  useEffect(() => {
    if (localStorage.getItem("tempData")) {
      setTempData(localStorage.getItem("tempData"));
      localStorage.removeItem("tempData");
    }
  }, []);

  useEffect(() => {
    if (tempData) {
      const { summary_content, questions, image, url } = JSON.parse(tempData);

      // Parse the first item of summary_content assuming it is a JSON string.
      const json_summary_content = JSON.parse(summary_content[0]);

      // Extract title, summary, and hash_tags from the parsed object.
      const title = json_summary_content.title;
      const summary = json_summary_content.summary;
      const collections = json_summary_content.hash_tags;

      // Parse each question in the questions array which is in JSON format.
      let quiz = [];
      questions.forEach((element) => {
        quiz.push(JSON.parse(element));
      });
      // Construct a new lurnyObject with all the extracted data.
      const lurnyObject = {
        user: userData.uid,
        title,
        summary,
        collections,
        quiz,
        image: getDefaultImg(image, url), // Call a helper function to get defaults for images.
        url,
      };
      // Add the new lurny to zustand store.
      // setNewLurny(lurnyObject);
      handleInsert(lurnyObject);
      setTempData(null);
    }
  }, [tempData]);

  const isYoutubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getDefaultImg = (image, url) => {
    if (isYoutubeUrl(url)) {
      return `{url}/maxresdefault.jpg`;
    } else {
      return image ? image : defaultImg;
    }
  };

  const handleInsert = async (lurny) => {
    const options = {
      method: "POST", // Request method
      headers: {
        "Content-Type": "application/json", // Indicate JSON content
      },
      body: JSON.stringify(lurny), // Convert data to JSON string
    };

    await fetch(`${backend_url}/api/lurny/insert`, options)
      .then((response) => response.json()) // Parse JSON response
      .then((responseData) => {
        console.log(responseData);
        addLurny(responseData);
        toast.success("Inserted!", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
        toast.error("Error!", {
          position: "top-right",
        });
      });
  };

  const handleShare = async (id) => {
    try {
      const response = await fetch(`${backend_url}/api/lurny/share/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        shareLurny(id);
        toast.success("Shared successfuly!", {
          position: "top-right",
        });
      } else {
        toast.error("Faild share!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Network error when trying to update the shared field!", {
        position: "top-right",
      });
    }
  };

  const myLurnies = async () => {
    const options = {
      method: "POST", // Request method
      headers: {
        "Content-Type": "application/json", // Indicate JSON content
        "ngrok-skip-browser-warning": true,
      },
      body: JSON.stringify({ user: userData.uid }),
    };
    await fetch(`${backend_url}/api/lurny/my-lurnies`, options)
      .then((response) => response.json()) // Parse JSON response
      .then((responseData) => {
        console.log(responseData);
        setLurnies(responseData);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
  };

  const countSharedTrue =
    lurnies.length > 0 ? lurnies.filter((obj) => obj.shared).length : 0;

  return (
    <div className="w-[100vw] h-[100vh] font-raleway">
      <LurnyHeader />
      <ToastContainer className="text-[2rem]" />
      <div className="w-full bg-[#262626] flex flex-1 p-[12rem] sm:p-[6rem] gap-[12rem] sm:gap-[4rem]">
        {/* Toggle button for mobile */}
        <div
          onClick={() => setShowSidePan(!showSidePan)}
          className="h-full bg-transparent sm:hidden fixed bottom-0 left-0 flex items-center z-50"
        >
          <IoIosArrowForward
            className={`text-[12rem] text-white hover:translate-x-[2rem] hover:duration-300 ${
              showSidePan
                ? "rotate-180 hover:translate-x-[-2rem] hover:duration-300"
                : ""
            }`}
          />
        </div>
        <UserPan
          all={lurnies.length}
          saved={countSharedTrue}
          showAll={(value) => setShowAll(value)}
        />
        {/* FilterPan is hidden on small screens initially */}
        <div
          className={`${showSidePan ? "absolute" : "hidden"} sm:block`}
        ></div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-wrap justify-start gap-[8rem] lg:gap-[2rem]">
            {lurnies.length > 0 &&
              lurnies.map((lurny, index) => (
                <div key={index}>
                  {(lurny.shared || showAll) && <LurnyItem data={lurny} />}
                  {lurny.shared ? (
                    <div className="bg-[#00B050] py-[1rem] rounded-md text-white text-[6rem] sm:text-[2rem] cursor-pointer">
                      Shared
                    </div>
                  ) : (
                    showAll && (
                      <div
                        className="bg-white px-[2rem] py-[0.8rem] rounded-md flex justify-between items-center text-black text-[2.2rem] cursor-pointer"
                        onClick={() => handleShare(lurny._id)}
                      >
                        <TfiShare />
                        <span className="flex flex-1 justify-center">
                          Share with Community
                        </span>
                      </div>
                    )
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LurnyUser;
