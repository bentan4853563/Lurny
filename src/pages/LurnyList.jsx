import { IoIosArrowForward } from "react-icons/io";

import LurnyHeader from "../components/LurnyHeader";

import lurnyImg from "../assets/images/Lurny/lurny1.png";
import LurnyItem from "../components/LurnyItem";
// import Pagination from "../components/Pagination";
import FilterPan from "../components/FilterPan";
import { useState } from "react";
import Pagination from "../components/Pagination";

const LurnyList = () => {
  const lurnyList = [
    {
      img: lurnyImg,
      category: "PROJECT MANAGEMENT TECHNOLOGY",
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      category: "PROJECT MANAGEMENT",
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      category: "PROJECT MANAGEMENT",
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      category: "PROJECT MANAGEMENT",
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      category: "PROJECT MANAGEMENT",
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      category: "PROJECT MANAGEMENT",
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
  ];

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="w-[100vw] h-[100vh] font-raleway">
      <LurnyHeader />
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
            {lurnyList.map((lurny, index) => (
              <LurnyItem
                key={index}
                title={lurny.title}
                category={lurny.category}
                img={lurny.img}
              />
            ))}
          </div>
          <div className="flex justify-center mt-[4rem]">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LurnyList;
