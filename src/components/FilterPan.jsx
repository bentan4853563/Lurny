import { useState } from "react";

export default function FilterPan() {
  const categoryList = [
    {
      category: "Art & Design",
      count: 345,
    },
    {
      category: "Business",
      count: 345,
    },
    {
      category: "Data Science",
      count: 634,
    },
    {
      category: "Artificial Intelligence",
      count: 7753,
    },
    {
      category: "Green Energy",
      count: 43,
    },
    {
      category: "Business Consulting",
      count: 853,
    },
  ];

  const mediaList = [
    {
      media: "Web Page",
      count: 7545,
    },
    {
      media: "Videos",
      count: 44543,
    },
  ];
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  return (
    <div className="w-[140rem] sm:w-[72rem] lg:w-[30rem] bg-[#262626] flex flex-col items-center gap-[8rem] lg:gap-[2rem]">
      {/* Category Filter */}
      <div className="w-full px-[10rem] sm:px-[6rem] lg:px-[2.5rem] py-[4rem] lg:py-0 bg-[#2E2E2E] rounded-[1.5rem] flex flex-col items-start">
        <span className="text-white text-start text-[10rem] sm:text-[5rem] lg:text-[2rem]  my-[2rem] select-none">
          Filter by Category
        </span>
        <div className="flex flex-col my-[4rem] lg:my-0">
          {categoryList.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center my-[4rem] sm:my-[2rem] lg:my-[1rem] gap-[4rem] lg:gap-[1.5rem] hover:scale-105 duration-100 cursor-pointer"
                onClick={() => setCategoryIndex(index)}
              >
                <div
                  className={`w-[8rem] h-[8rem] sm:w-[6rem] sm:h-[6rem] lg:w-[2.3rem] lg:h-[2.3rem] ${
                    index === categoryIndex ? "bg-[#7030A0]" : "bg-white"
                  } border border-white rounded-[1.5rem] lg:rounded-[0.5rem]`}
                ></div>
                <span className="text-white text-start text-[8rem] sm:text-[4rem] lg:text-[1.5rem] select-none truncate">
                  {item.category} ({item.count})
                </span>
              </div>
            );
          })}
        </div>
        <span className="text-[#FFC36D] text-start text-[8rem] sm:text-[5rem] lg:text-[1.5rem] my-[2rem] cursor-pointer hover:underline select-none">
          View all categories
        </span>
      </div>

      {/* Type Filter */}
      <div className="w-full px-[10rem] sm:px-[6rem] lg:px-[2.5rem] py-[4rem] lg:py-0 bg-[#2E2E2E] rounded-[1.5rem] flex flex-col items-start">
        <span className="text-white text-start text-[10rem] sm:text-[5rem] lg:text-[2rem] my-[2rem] select-none">
          Filter by Media
        </span>
        <div className="flex flex-col my-[4rem] lg:my-0  lg:mb-[1rem]">
          {mediaList.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full flex items-center my-[4rem] sm:my-[2rem] lg:my-[1rem] gap-[4rem] lg:gap-[1.5rem] hover:scale-105 duration-100 cursor-pointer truncate"
                onClick={() => setMediaIndex(index)}
              >
                <div
                  className={`w-[8rem] h-[8rem] sm:w-[6rem] sm:h-[6rem] lg:w-[2.3rem] lg:h-[2.3rem] ${
                    index === mediaIndex ? "bg-[#7030A0]" : "bg-white"
                  } border border-white rounded-[1.5rem] lg:rounded-[0.5rem] font-sans`}
                ></div>
                <span className="text-white text-start text-[8rem] sm:text-[4rem] lg:text-[1.5rem]  select-none">
                  {item.media} ({item.count})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
