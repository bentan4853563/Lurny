import PropTypes from "prop-types";

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const FaqItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="mb-2">
      <span
        className={`${
          isOpen ? "bg-[#7F52BB] text-white" : "bg-white text-black"
        } px-[6rem] py-[4rem] xl:p-[2rem] flex justify-between items-center w-full text-left font-semibold text-[8rem] sm:text-[4rem] md:text-[4rem] lg:text-[2.5rem] focus:outline-none cursor-pointer select-none`}
        onClick={onToggle}
      >
        <span>{faq.question}</span>
        <span
          className={`border-2 ${
            isOpen ? "border-white" : "border-black"
          } rounded-full`}
        >
          {isOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </span>
      {isOpen && (
        <div className="bg-white px-[6rem] py-[2rem] xl:p-[2rem] flex justify-start shadow-md shadow-gray-200">
          <p className="text-start text-[8rem] sm:text-[4rem] md:text-[3.5rem] lg:text-[2rem] select-none">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

FaqItem.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Ensure each FAQ has a unique ID
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FaqItem;
