import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TfiShare } from "react-icons/tfi";

import { useLurnyStore } from "../stores/lurnyStore";

import LurnyHeader from "../components/LurnyHeader";
import LurnyItem from "../components/LurnyItem";

import defaultImg from "../assets/images/Lurny/default.png";

const LurnyCategory = () => {
  const { newLurny, lurnies, setNewLurny, setLurnies, share } = useLurnyStore();
  const [tempData, setTempData] = useState(null);

  const backend_url = "https://6faf-88-99-162-157.ngrok-free.app";
  // const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getLurnies();
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      // Replace with your actual trusted origin
      const trustedOrigin = "https://9c08-88-99-162-157.ngrok-free.app";

      // Validate the event origin and the type of message.
      if (
        event.origin === trustedOrigin &&
        event.data.type &&
        event.data.type === "FROM_EXTENSION"
      ) {
        setTempData(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (tempData) {
      const { summary_content, questions, image, url } = tempData;

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
        title,
        summary,
        collections,
        quiz,
        image: getDefaultImg(image, url), // Call a helper function to get defaults for images.
        url,
      };
      // Add the new lurny to zustand store.
      setNewLurny(lurnyObject);
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

  const handleShare = async (lurny) => {
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
        share();
        toast.success(`Shared! \n${responseData}`, {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
        toast.error(`Error! \n${error}`, {
          position: "top-right",
        });
      });
  };

  const getLurnies = async () => {
    const options = {
      method: "GET", // Request method
      headers: {
        "Content-Type": "application/json", // Indicate JSON content
        "ngrok-skip-browser-warning": true,
      },
    };
    await fetch(
      "https://6faf-88-99-162-157.ngrok-free.app/api/lurny/get",
      options
    )
      .then((response) => response.json()) // Parse JSON response
      .then((responseData) => {
        console.log(responseData);
        setLurnies(responseData);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
        // toast.error(`Error! \n${error}`, {
        //   position: "top-right",
        // });
      });
  };

  return (
    <div className="w-[100vw] h-[100vh] font-raleway">
      <LurnyHeader />
      <ToastContainer />
      <div className="w-full bg-[#262626] flex flex-1 p-[12rem] sm:p-[6rem] gap-[12rem] sm:gap-[4rem]">
        <div className="flex flex-col justify-between">
          <div className="flex flex-wrap justify-start gap-[8rem] lg:gap-[2rem]">
            {Object.keys(newLurny).length > 0 && (
              <div className="">
                <LurnyItem data={newLurny} />
                {newLurny.shared ? (
                  <div className="bg-[#00B050] py-[1rem] rounded-md text-white text-[2rem] cursor-pointer">
                    Shared
                  </div>
                ) : (
                  <div
                    className="bg-white px-[2rem] py-[1rem] rounded-md flex justify-between items-center text-black text-[2.2rem] cursor-pointer"
                    onClick={() => handleShare(newLurny)}
                  >
                    <TfiShare />
                    <span className="flex flex-1 justify-center">
                      Share with Community
                    </span>
                  </div>
                )}
              </div>
            )}
            {lurnies.length > 0 &&
              lurnies.map((lurny, index) => (
                <div key={index} className="">
                  <LurnyItem data={lurny} />
                  {lurny._id ? (
                    <div className="bg-[#00B050] py-[1rem] rounded-md text-white text-[2rem] cursor-pointer">
                      Shared
                    </div>
                  ) : (
                    <div
                      className="bg-white px-[2rem] py-[1rem] rounded-md flex justify-between items-center text-black text-[2.2rem] cursor-pointer"
                      onClick={() => handleShare(lurny)}
                    >
                      <TfiShare />
                      <span className="flex flex-1 justify-center">
                        Share with Community
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LurnyCategory;
