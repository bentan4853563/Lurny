/* eslint-disable no-useless-escape */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import defaultImg from "../assets/images/Lurny/default.png";

function LurnyItem({ data }) {
  const navigate = useNavigate();

  const { title, image, url } = data;

  const handleClick = () => {
    const newImg = getDefaultImg(image, url);
    navigate("/lurny-quiz", { state: { ...data, newImg } });
  };

  const isYoutubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getDefaultImg = (image, url) => {
    if (isYoutubeUrl(url)) {
      return getThumbnailURLFromVideoURL(url);
    } else {
      return image ? image : defaultImg;
    }
  };

  function getYoutubeVideoID(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  function getThumbnailURLFromVideoURL(videoURL) {
    const videoID = getYoutubeVideoID(videoURL);
    if (!videoID) {
      throw new Error("Invalid YouTube URL");
    }
    return `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  }

  const newImg = getDefaultImg(image, url);

  return (
    <div
      onClick={handleClick}
      className="h-[80rem] w-[80rem] sm:w-[48rem] lg:h-[32rem] sm:h-[48rem] lg:w-[32rem] cursor-pointer hover:scale-105 hover:duration-300"
    >
      <img
        src={newImg}
        alt="lurny image"
        className="h-1/2 w-full object-cover rounded-[2rem] sm:rounded-[1.5rem]"
      />
      <div className="w-full flex flex-col text-white items-start gap-[2rem] sm:gap-[1rem] p-[4rem] sm:p-[2rem]">
        <span className="w-full text-start text-[5rem] sm:text-[3rem] lg:text-[1.2rem] font-semibold truncate">
          Category
        </span>
        <div className="w-full text-[8rem] sm:text-[5rem] lg:text-[2.3rem] leading-[8.5rem] sm:leading-[6rem] lg:leading-[3rem] text-left font-medium line-clamp-3">
          {title}
        </div>
      </div>
    </div>
  );
}

LurnyItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LurnyItem;
