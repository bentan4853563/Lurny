import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function LurnyItem({ img, category, title }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/lurny-quiz")}
      className="h-[80rem] w-[80rem] sm:w-[48rem] lg:h-[32rem] sm:h-[48rem] lg:w-[32rem] cursor-pointer hover:scale-105 hover:duration-300"
    >
      <img
        src={img}
        alt="lurny image"
        className="h-1/2 w-full object-cover rounded-[2rem] sm:rounded-[1.5rem]"
      />
      <div className="w-full flex flex-col text-white items-start gap-[2rem] sm:gap-[1rem] p-[4rem] sm:p-[2rem]">
        <span className="w-full text-start text-[5rem] sm:text-[3rem] lg:text-[1.2rem] font-semibold truncate">
          {category}
        </span>
        <div className="w-full text-[8rem] sm:text-[5rem] lg:text-[2.3rem] leading-[8.5rem] sm:leading-[6rem] lg:leading-[2.5rem] text-left font-medium line-clamp-3">
          {title}
        </div>
      </div>
    </div>
  );
}

LurnyItem.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default LurnyItem;
