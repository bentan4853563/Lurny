// import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { jwtDecode } from "jwt-decode";

import { useLurnyStore } from "../stores/lurnyStore";

import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import LetterLogo from "../assets/icons/letter_logo.png";
import defaultImg from "../assets/images/Lurny/default.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TranslateComponent from "../components/TranslateComponent";

function LurnyQuiz() {
  const navigate = useNavigate();

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const { lurnies, setLurnies } = useLurnyStore();

  const [userData, setUserData] = useState(null);
  const [quizData, setQuizData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState();
  const [relatedLurnies, setRelatedLurnies] = useState([]);

  const [content, setContent] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [answerNumber, setAnswerNumber] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState(false);

  let { url } = useParams();
  useEffect(() => {
    setCurrentQuestionNumber(1);
    setAnswerNumber(null);
    setAnswered(false);

    const decodedUrl = decodeURIComponent(url);

    if (lurnies.length > 0 && decodedUrl) {
      const foundLurny = lurnies.find((lurny) => lurny.url === decodedUrl); // Utilize .find() for efficiency
      if (foundLurny) {
        setQuizData(foundLurny);
        setSelectedIndex(lurnies.indexOf(foundLurny)); // Get index using indexOf since the item was found
      }
    }
  }, [lurnies, url]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      setUserData(jwtDecode(accessToken));
    }
  }, []);

  useEffect(() => {
    if (!lurnies || lurnies.length == 0) {
      getLurnies();
    }
  }, [lurnies]);

  useEffect(() => {
    const calculateRelevance = (lurnyCollections, targetCollections) => {
      return lurnyCollections.reduce((score, collection) => {
        return score + (targetCollections.includes(collection) ? 1 : 0);
      }, 0);
    };

    if (lurnies.length > 0 && quizData && quizData.collections) {
      let filteredLurnies = lurnies.filter(
        (lurny) => lurny.url !== quizData.url
      );
      let scoredLurnies = filteredLurnies.map((lurny) => ({
        ...lurny,
        relevanceScore: calculateRelevance(
          lurny.collections,
          quizData.collections
        ),
      }));

      scoredLurnies.sort((a, b) => b.relevanceScore - a.relevanceScore);

      // Get top 10 or fewer related lurnies
      const topRelatedLurnies = scoredLurnies
        .slice(0, 10)
        .filter((lurny) => lurny.relevanceScore > 0);

      setRelatedLurnies(topRelatedLurnies);
    } else {
      setRelatedLurnies([]); // Reset related lurnies if no relevant data is present
    }
  }, [lurnies, quizData]);

  useEffect(() => {
    setAnswerNumber(null);
    setAnswered(false);
  }, [content, currentQuestionNumber]);

  useEffect(() => {
    setCurrentQuestionNumber(0);
  }, [content]);

  const getLurnies = async () => {
    const options = {
      method: "GET", // Request method
      headers: {
        "Content-Type": "application/json", // Indicate JSON content
        "ngrok-skip-browser-warning": true,
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

  const { title, summary, quiz, collections } = quizData;

  const isYoutubeUrl = (url) => {
    if (url) {
      return url.includes("youtube.com") || url.includes("youtu.be");
    }
  };

  const getDefaultImg = (image, url) => {
    if (isYoutubeUrl(url)) {
      return getThumbnailURLFromVideoURL(url);
    } else {
      return image;
    }
  };

  function getYoutubeVideoID(url) {
    const regExp =
      // eslint-disable-next-line no-useless-escape
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  function getThumbnailURLFromVideoURL(videoURL) {
    const videoID = getYoutubeVideoID(videoURL);
    if (!videoID) {
      // throw new Error("Invalid YouTube URL");
      return defaultImg;
    }
    return `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  }

  const newImg = getDefaultImg(quizData.image, quizData.url);

  const buttons = ["Summary", "Quiz Me!", "Remember this"];

  const handleNextQuiz = () => {
    if (currentQuestionNumber < quiz.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
    setAnswered(false);
  };
  const goBack = () => {
    if (selectedIndex === 0) {
      // toast.warning("This lurny is the first.", {
      //   position: "top-right",
      //   autoClose: 1000,
      // });
      alert("This lurny is the first.");
    } else {
      setQuizData(lurnies[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goForward = () => {
    if (selectedIndex < lurnies.length - 2) {
      setQuizData(lurnies[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    } else {
      // toast.warning("This lurny is the end.", {
      //   position: "top-right",
      //   autoClose: 1000,
      // });
      alert("This lurny is the end.");
    }
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleClick = (url) => {
    navigate(`/lurny/quiz/${encodeURIComponent(url)}`);
  };

  return (
    <div className="min-h-[100vh] font-raleway">
      {/* Header */}
      <div className="w-full bg-black px-[4rem] sm:px-[16rem] lg:px-[12rem] flex justify-between items-center py-[4rem] lg:py-[1.5rem]">
        <Link to="/lurny/list" className="select-none">
          <img
            src={LetterLogo}
            alt="Letter logo"
            className="w-[48rem] sm:w-[32rem] md:w-[24rem] lg:w-[18rem] xl:w-[12rem]"
          />
        </Link>
        <div className="flex items-center gap-[4rem] sm:gap-[2rem]">
          <button
            onClick={goBack}
            data-tooltip-id="previous-lurny"
            className="flex items-center justify-center p-[0.5rem] sm:pl-2 text-white text-[10rem] sm:text-[3rem] bg-[#7F52BB] rounded-full focus:outline-none"
          >
            <IoIosArrowBack />
          </button>
          <Tooltip
            id="previous-lurny"
            place="bottom"
            content="Previous Lurny"
            style={{
              width: "150px",
              textAlign: "center",
              fontSize: "16px",
              backgroundColor: "#595959",
              color: "white",
              borderRadius: "4px",
              padding: "4px",
            }}
          />
          {buttons.map((name, index) => (
            <span
              key={index}
              className={`${
                content === index
                  ? "bg-[#595959] flex"
                  : "bg-transparent hidden sm:flex"
              } w-[52rem] sm:w-auto items-center justify-center text-white px-[2rem] py-[2.5rem] sm:py-[0.5rem] rounded-[2rem] sm:rounded-[0.5rem] text-[6.5rem] sm:text-[2rem] font-thin focus:outline-none border-none cursor-pointer`}
              onClick={() => setContent(index)}
            >
              {name}
            </span>
          ))}
          <button
            onClick={goForward}
            data-tooltip-id="next-lurny"
            className="flex items-center justify-center p-[0.5rem] sm:pl-2 text-white text-[10rem] sm:text-[3rem] bg-[#7F52BB] rounded-full focus:outline-none"
          >
            <IoIosArrowForward />
          </button>

          <Tooltip
            id="next-lurny"
            place="bottom"
            content="Next Lurny"
            style={{
              width: "150px",
              textAlign: "center",
              fontSize: "16px",
              backgroundColor: "#595959",
              color: "white",
              borderRadius: "4px",
              padding: "4px",
            }}
          />
        </div>
        <div className="flex items-center gap-[8rem] lg:gap-[2rem]">
          {userData && (
            <img
              src={userData.photoURL}
              // src="###"
              alt="Chrome Icon"
              onClick={() => navigate("/lurny-category")}
              className="w-[16rem] sm:w-[12rem] md:w-[10rem] lg:w-[8rem] xl:w-[4rem] rounded-[100%] cursor-pointer"
            />
          )}
          <IoMenu className="text-[16rem] sm:text-[10rem] md:text-[8rem] lg:text-[6rem] xl:text-[4rem] text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* body */}
      <div className="flex flex-wrap px-[12rem] py-[8rem] gap-[8rem] sm:gap-0">
        {/* Image */}
        <div className="w-full sm:w-[32rem] px-[16rem] sm:px-0 flex flex-col ">
          <a
            href={quizData.url}
            target="black"
            className="text-white text-start text-[7rem] sm:text-[2.5rem] hover:text-sky-500"
          >
            View Original
          </a>
          {userData && (
            <img
              src={
                userData.email === "bigboss44144@gmail.com"
                  ? defaultImg
                  : newImg
              }
              alt=""
              className="w-full h-[64rem] sm:h-[20rem] object-cover rounded-[2rem]"
            />
          )}
          <TranslateComponent />
        </div>

        <div className="flex flex-1 px-0 sm:px-[8rem]">
          {content === 0 && (
            // Full Article
            <div className="text-white">
              {/* title */}
              <h1 className="text-[10rem] sm:text-[4rem] text-left font-bold">
                {title
                  ? title
                  : "There is no Quiz data. Please wait loading data."}
              </h1>
              {/* Summary */}
              <div className="flex flex-col gap-[4rem] sm:gap-[2rem] mt-[4rem]">
                {summary &&
                  summary.length > 0 &&
                  summary.map((item, index) => (
                    <div
                      key={index}
                      className=" flex items-start gap-[2rem] text-gray-300 text-left text-[7rem] leading-[7.5rem] sm:text-[2.3rem] sm:leading-[2.5rem]"
                    >
                      <span className="flex shrink-0">{index + 1}.</span>
                      <p>{item}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {content === 1 && (
            <div className="text-white rounded-[2rem] flex flex-col gap-[12rem] sm:gap-[4rem] items-start">
              {/* Question */}
              <p className=" text-left text-[10rem] sm:text-[4rem] leading-[10.5rem] sm:leading-[4.5rem] font-semibold">
                Q{currentQuestionNumber + 1}:{" "}
                {quiz[currentQuestionNumber].question}
              </p>

              <ToastContainer />

              <div className="w-full flex flex-col gap-[4rem] sm:gap-[2rem] items-start">
                {quiz[currentQuestionNumber].answer.map((answer, index) => (
                  // Answer
                  <div
                    className={classNames(
                      "w-full flex justify-between items-center px-[8rem] sm:px-[2rem] py-[4rem] sm:py-[1rem] rounded-[1rem] text-left text-[7rem] sm:text-[2rem] leading-[7.5rem] sm:leading-[2.5rem] cursor-pointer border",
                      answered
                        ? answerNumber === index
                          ? quiz[currentQuestionNumber].correctanswer ===
                            quiz[currentQuestionNumber].answer[index]
                            ? "border-[#00AF4F]"
                            : "border-[#FF0000]"
                          : quiz[currentQuestionNumber].correctanswer ===
                            quiz[currentQuestionNumber].answer[index]
                          ? "border-[#00AF4F]"
                          : "border-none"
                        : answerNumber === index
                        ? "bg-[#7F7F7F]"
                        : "border-none"
                    )}
                    key={index}
                    onClick={() => !answered && setAnswerNumber(index)}
                  >
                    <p className="flex flex-1">
                      <span className="mr-[4rem]">
                        {String.fromCharCode(index + 65)}
                      </span>
                      <span className="text-left">{answer}</span>
                    </p>
                    {answered &&
                      quiz[currentQuestionNumber].correctanswer ===
                        quiz[currentQuestionNumber].answer[index] && (
                        <IoIosInformationCircleOutline
                          data-tooltip-id="correct-answer"
                          onClick={() =>
                            setIsShowCorrectAnswer(!isShowCorrectAnswer)
                          }
                          className="text-[16rem] sm:text-[4rem] my-auto right-4"
                        />
                      )}
                    <div></div>
                    <Tooltip
                      id="correct-answer"
                      place="bottom"
                      content={quiz[currentQuestionNumber].explanation}
                      style={{
                        width: "300px",
                        textAlign: "justify",
                        backgroundColor: "#00B050",
                        color: "white",
                        borderRadius: "8px",
                        padding: "24px",
                      }}
                    />
                  </div>
                ))}
              </div>
              {!answered ? (
                <button
                  onClick={() => setAnswered(true)}
                  className="bg-[#FFC36D] text-[6rem] sm:text-[1.8rem] border-none focus:outline-none active:bg-yellow-300 text-black"
                >
                  SUBMIT ANSWER
                </button>
              ) : currentQuestionNumber < quiz.length - 1 ? (
                <button
                  onClick={handleNextQuiz}
                  className="bg-[#FFC36D] text-[6rem] sm:text-[1.8rem] border-none focus:outline-none active:bg-yellow-300 text-black"
                >
                  NEXT QUESTION
                </button>
              ) : (
                <button
                  onClick={() => navigate("/lurny-category")}
                  className="bg-[#FFC36D] text-[6rem] sm:text-[1.8rem] border-none focus:outline-none active:bg-yellow-300 text-black"
                >
                  GO TO HOME
                </button>
              )}
            </div>
          )}
          {content === 2 && (
            <div className="text-white rounded-[2rem] flex flex-col gap-[4rem] items-start">
              {/* Question */}
              <p className=" text-left text-[3rem] font-semibold">
                Q{currentQuestionNumber + 1}:{" "}
                {quiz[currentQuestionNumber].question}
              </p>

              <div className="w-full flex flex-col gap-[2rem] items-start">
                {quiz[currentQuestionNumber].answer.map((answer, index) => (
                  // Answer
                  <div
                    className={classNames(
                      "w-full flex justify-between items-center px-[2rem] py-[1rem] rounded-[1rem] text-left text-[2rem] cursor-pointer",
                      answered
                        ? answerNumber === index
                          ? quiz[currentQuestionNumber].correctanswer ===
                            quiz[currentQuestionNumber].answer[index]
                            ? "border-[#00AF4F]"
                            : "border-[#FF0000]"
                          : quiz[currentQuestionNumber].correctanswer ===
                            quiz[currentQuestionNumber].answer[index]
                          ? "border-[#00AF4F]"
                          : "border-none"
                        : answerNumber === index
                        ? "bg-[#7F7F7F] border-none outline-none"
                        : "border-none"
                    )}
                    key={index}
                    onClick={() => !answered && setAnswerNumber(index)}
                  >
                    <p className="flex">
                      <span className="mr-[4rem]">
                        {String.fromCharCode(index + 65)}
                      </span>
                      <span className="text-left">{answer}</span>
                    </p>
                    {answered &&
                      quiz[currentQuestionNumber].correctanswer ===
                        quiz[currentQuestionNumber].answer[index] && (
                        <IoIosInformationCircleOutline
                          data-tooltip-id="correct-answer"
                          className="text-[4rem] my-auto right-4"
                        />
                      )}
                    <Tooltip
                      id="correct-answer"
                      place="bottom"
                      content={quiz[currentQuestionNumber].explanation}
                      style={{
                        width: "500px",
                        textAlign: "justify",
                        backgroundColor: "#00B050",
                        color: "white",
                        borderRadius: "8px",
                        padding: "24px",
                      }}
                    />
                  </div>
                ))}
              </div>
              {!answered ? (
                <button
                  onClick={() => setAnswered(true)}
                  className="bg-[#FFC36D] text-[1.8rem] border-none focus:outline-none active:bg-yellow-300 text-black"
                >
                  SUBMIT ANSWER
                </button>
              ) : currentQuestionNumber !== quiz.length - 1 ? (
                <button
                  onClick={handleNextQuiz}
                  className="bg-[#FFC36D] text-[1.8rem] border-none focus:outline-none active:bg-yellow-300 text-black"
                >
                  NEXT QUESTION
                </button>
              ) : (
                <button
                  onClick={() => navigate("/")}
                  className="bg-[#FFC36D] text-[1.8rem] border-none focus:outline-none active:bg-yellow-300 text-black"
                >
                  GO TO HOME
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full sm:w-[32rem] flex flex-wrap sm:gap-[4rem]">
          {/* Related Collections */}
          <div className="w-1/2 sm:w-full flex flex-col items-start text-white">
            <span className="text-start text-[8rem] sm:text-[3rem] font-bold">
              Related Collections
            </span>
            <ul className="ml-[6rem] sm:ml-[2rem]">
              {collections &&
                collections.length > 0 &&
                collections.slice(0, 9).map((keyword, index) => (
                  <li
                    onClick={() =>
                      navigate("/lurny/list", { state: { category: keyword } })
                    }
                    key={index}
                    className="text-gray-300 text-left text-[6rem] sm:text-[2rem] cursor-pointer"
                  >
                    {keyword}
                  </li>
                ))}
            </ul>
          </div>

          {/* Related Lurnies */}
          <div className="w-1/2 sm:w-full flex flex-col items-start text-white">
            <span className="text-start text-[8rem] sm:text-[3rem] font-bold">
              Related Lurnies
            </span>
            <div className="flex flex-col gap-[1.5rem]">
              {relatedLurnies.length > 0 &&
                relatedLurnies.map((item, index) => (
                  <div key={index} className="flex items-center gap-[2rem]">
                    <img
                      onClick={() => handleClick(item.url)}
                      // src="###"
                      src={
                        userData.email === "bigboss44144@gmail.com"
                          ? defaultImg
                          : getDefaultImg(item.image, item.url)
                      }
                      alt="lurny image"
                      className="w-[10rem] h-[6rem] rounded-lg cursor-pointer"
                    />
                    <span className="text-[1.5rem] text-left flex flex-1">
                      {item.title}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// LurnyQuiz.propTypes = {};

export default LurnyQuiz;
