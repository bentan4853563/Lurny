import LurnyHeader from "../components/LurnyHeader";

import lurnyImg from "../assets/images/Lurny/lurny1.png";
import LurnyItem from "../components/LurnyItem";
import Pagination from "../components/Pagination";

const LurnySearch = () => {
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

  return (
    <div className="w-[100vw] h-[100vh] font-raleway">
      <LurnyHeader />

      <div className="w-full bg-[#262626] flex flex-1 p-[12rem] sm:p-[6rem] gap-[12rem] sm:gap-[4rem]">
        <div></div>
        {/* FilterPan is hidden on small screens initially */}

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

export default LurnySearch;
