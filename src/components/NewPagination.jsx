import { useState } from "react";
import PropTypes from "prop-types";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const NewPagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleClick = (event) => {
    paginate(Number(event.target.id));
  };

  const handleNextBtn = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  return (
    <nav className="flex justify-center my-4 mx-auto">
      {pageNumbers.length > 1 && (
        <ul className="list-reset flex items-center gap-[1.5rem]">
          <li>
            <button
              onClick={handlePrevBtn}
              disabled={currentPage === 1}
              className={`px-3 py-2 mx-1 bg-blue-500 text-white text-[2rem] rounded focus:outline-none ${
                currentPage === 1 && "cursor-not-allowed opacity-50"
              }`}
            >
              <IoIosArrowBack />
            </button>
          </li>
          {pageNumbers.map((number) => {
            if (
              number < maxPageNumberLimit + 1 &&
              number > minPageNumberLimit
            ) {
              return (
                <li
                  key={number}
                  className={`${
                    currentPage === number ? "bg-blue-300" : "bg-white"
                  } border-gray-400 border-1 rounded-lg`}
                >
                  <a
                    id={number}
                    onClick={handleClick}
                    href="#!"
                    className={`hover:bg-blue-200 px-4 py-2 rounded text-[2rem] font-sans ${
                      currentPage === number ? "text-white" : "text-blue-500"
                    }`}
                  >
                    {number}
                  </a>
                </li>
              );
            } else {
              return null;
            }
          })}
          {maxPageNumberLimit < pageNumbers.length && (
            <li className="mx-2 text-[2rem] text-white">...</li>
          )}
          <li>
            <button
              onClick={handleNextBtn}
              disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
              className={`px-3 py-2 mx-1 bg-blue-500 text-white text-[2rem] rounded focus:outline-none ${
                currentPage === pageNumbers[pageNumbers.length - 1] &&
                "cursor-not-allowed opacity-50"
              }`}
            >
              <IoIosArrowForward />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

NewPagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
};

export default NewPagination;
