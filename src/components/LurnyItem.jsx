/* eslint-disable no-useless-escape */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import defaultImg from "../assets/images/Lurny/default.png";

function LurnyItem({ data }) {
  const navigate = useNavigate();

  const { title, image, url } = data;

  const handleClick = () => {
    navigate(`/lurny/quiz/${encodeURIComponent(url)}`);
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
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  function extractChannelName(url) {
    // Regular expressions for different YouTube channel URL formats
    const patterns = [
      /youtube\.com\/channel\/([\w-]+)/, // For URLs with /channel/
      /youtube\.com\/c\/([\w-]+)/, // For URLs with /c/
      /youtube\.com\/user\/([\w-]+)/, // For URLs with /user/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1]; // Return the channel name or ID
      }
    }

    // If no pattern matches, return an error message
    return "No channel name or ID found in the URL";
  }

  function getThumbnailURLFromVideoURL(videoURL) {
    const videoID = getYoutubeVideoID(videoURL);
    if (!videoID) {
      // throw new Error("Invalid YouTube URL");
      return defaultImg;
    }
    return `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  }

  const newImg = getDefaultImg(image, url);
  const getCategory = isYoutubeUrl(url) ? extractChannelName(url) : "Category";

  return (
    <div
      onClick={handleClick}
      className="w-[80rem] sm:w-[48rem] lg:w-[32rem] cursor-pointer hover:scale-105 hover:duration-300"
    >
      <img
        src={newImg}
        alt="lurny image"
        className="h-[40rem] sm:h-[24rem] lg:h-[16rem] w-full object-cover rounded-[2rem] sm:rounded-[1.5rem]"
      />
      <div className="w-full flex flex-col text-white items-start gap-[2rem] sm:gap-[1rem] p-[4rem] sm:p-[2rem]">
        <span className="w-full text-start text-[5rem] sm:text-[3rem] lg:text-[1.2rem] font-semibold truncate">
          {getCategory}
        </span>
        <div className="w-full text-[6rem] sm:text-[5rem] lg:text-[2rem] leading-[8.5rem] sm:leading-[6rem] lg:leading-[2.5rem] text-left font-medium  line-clamp-3 sm:line-clamp-2">
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
