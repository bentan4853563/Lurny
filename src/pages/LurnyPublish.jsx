import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoIosArrowForward } from "react-icons/io";

import { useLurnyStore } from "../stores/lurnyStore";

import LurnyHeader from "../components/LurnyHeader";
import LurnyItem from "../components/LurnyItem";
import FilterPan from "../components/FilterPan";
// import Pagination from "../components/Pagination";

const LurnyPublish = () => {
  const { lurnies, setLurnies } = useLurnyStore();
  const [showFilter, setShowFilter] = useState(false);

  const backend_url = "https://6faf-88-99-162-157.ngrok-free.app";

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
      <ToastContainer />
      <div className="bg-[#2E2E2E] flex flex-col text-white py-[4rem] sm:py-[3rem] lg:py-[2rem]">
        <span className="text-[12rem] lg:text-[4rem] font-bold">
          All Lurnies
        </span>
        <span className="text-[8rem] lg:text-[2.5rem] font-medium">
          143K Lurnies and counting…
        </span>
      </div>
      <div className="w-full bg-[#262626] flex flex-1 p-[12rem] sm:p-[6rem] gap-[12rem] sm:gap-[4rem]">
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
          <FilterPan />
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
  );
};

export default LurnyPublish;
