// import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const pageButtons = [1, 2, 3, 4, 5];
  const pageCount = 5;

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex gap-[2rem] items-center text-white">
      <button
        onClick={handlePreviousPage}
        className="flex items-center text-[8rem] sm:text-[4rem] lg:text-[2rem] bg-transparent focus:outline-none active:border-green-600"
      >
        <IoIosArrowBack />
        <span className="hidden sm:flex">Prev</span>
      </button>
      <div className="flex items-center gap-[1rem]">
        {pageButtons.map((num) => {
          return (
            <span
              key={num}
              onClick={() => setCurrentPage(num)}
              className={` ${
                currentPage == num
                  ? "bg-white text-[black]"
                  : "bg-transparent text-white"
              } flex items-center rounded-[4rem] sm:rounded-[1rem] text-[8rem] sm:text-[5rem] lg:text-[2rem] font-medium px-[6rem] sm:px-[4rem] lg:px-[1.5rem] py-[1.5rem] lg:py-[0.5rem] cursor-pointer select-none active:shadow-sm active:shadow-gray-200`}
            >
              {num}
            </span>
          );
        })}
      </div>
      <button
        onClick={handleNextPage}
        className="flex items-center text-[8rem] sm:text-[4rem] lg:text-[2rem] bg-transparent focus:outline-none active:border-green-600"
      >
        <span className="hidden sm:flex">Next</span>
        <IoIosArrowForward />
      </button>
    </div>
  );
}

Pagination.propTypes = {};

export default Pagination;
