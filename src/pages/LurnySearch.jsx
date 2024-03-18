import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoIosArrowForward } from "react-icons/io";
import { ImSearch } from "react-icons/im";

import { useLurnyStore } from "../stores/lurnyStore";

import LurnyHeader from "../components/LurnyHeader";
import LurnyItem from "../components/LurnyItem";
import CategoryPan from "../components/CatetoryPan";
// import Pagination from "../components/Pagination";

const LurnySearch = () => {
  const { lurnies, setLurnies } = useLurnyStore();
  const [showFilter, setShowFilter] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getLurnies();
  }, []);

  const getLurnies = async () => {
    const options = {
      method: "GET", // Request method
      headers: {
        "Content-Type": "application/json", // Indicate JSON content
      },
    };

    await fetch(`${backend_url}/api/lurny/get`, options)
      .then((response) => response.json()) // Parse JSON response
      .then((responseData) => {
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
      <ToastContainer className="text-start" />

      <div className="w-full bg-[#262626] flex flex-col p-[12rem] sm:p-[6rem] gap-[12rem] sm:gap-[4rem]">
        {/* Search bar */}
        <div className="bg-[#1A1A1A] w-full px-[2rem] py-[1rem] flex flex-item items-center rounded-[0.5rem]">
          <ImSearch className="text-white text-[3rem]" />
          <input
            type="text"
            className="bg-transparent text-white text-[2.5rem] px-[1rem] flex flex-1 focus:outline-none"
            placeholder="Search topics and people"
          />
        </div>
        <div className="flex">
          {/* Toggle button for mobile */}
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="h-full bg-transparent sm:hidden fixed bottom-0 left-0 flex items-center z-50"
          >
            <IoIosArrowForward
              className={`text-[12rem] text-white hover:translate-x-[2rem] hover:duration-300 ${
                showFilter
                  ? "rotate-180 hover:translate-x-[-2rem] hover:duration-300"
                  : ""
              }`}
            />
          </div>

          {/* FilterPan is hidden on small screens initially */}
          <div className={`${showFilter ? "absolute" : "hidden"} sm:block`}>
            <CategoryPan />
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-wrap justify-start gap-[8rem] lg:gap-[2rem]">
              {lurnies.map(
                (lurny, index) =>
                  lurny.shared && <LurnyItem key={index} data={lurny} />
              )}
            </div>
            {/* <div className="flex justify-center mt-[4rem]">
            <Pagination />
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LurnySearch;
