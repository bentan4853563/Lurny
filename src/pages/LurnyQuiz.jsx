// import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import LetterLogo from "../assets/icons/letter_logo.png";
import userImg from "../assets/images/home/User.png";

function LurnyQuiz() {
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [answerNumber, setAnswerNumber] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState(false);

  const data = location.state;
  const { title, summary, quiz, newImg, collections, url } = data;

  useEffect(() => {
    setAnswerNumber(null);
    setAnswered(false);
  }, [content, currentQuestionNumber]);

  useEffect(() => {
    setCurrentQuestionNumber(0);
  }, [content]);

  const buttons = ["Read Full Article", "Quiz Me!", "Remember this"];

  const handleNextQuiz = () => {
    if (currentQuestionNumber < quiz.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
    setAnswered(false);
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };
  console.log(quiz.length, currentQuestionNumber);
  return (
    <div className="font-raleway min-h-[100vh]">
      {/* Header */}
      <div className="w-full bg-black px-[16rem] lg:px-[20rem] flex justify-between items-center py-[4rem] lg:py-[1.5rem]">
        <Link to="/" className="select-none">
          <img
            src={LetterLogo}
            alt="Letter logo"
            className="w-[48rem] sm:w-[32rem] md:w-[24rem] lg:w-[18rem] xl:w-[12rem]"
          />
        </Link>
        <div className="flex items-center gap-[2rem]">
          <div className="w-[4rem] h-[4rem] flex items-center justify-center pr-1 text-white text-[3rem] bg-[#7F52BB] rounded-full">
            <IoIosArrowBack />
          </div>
          {buttons.map((name, index) => (
            <button
              key={index}
              className={`${
                content === index ? "bg-[#595959]" : "bg-transparent"
              } text-white xl:text-[2rem] font-thin focus:outline-none border-none`}
              onClick={() => setContent(index)}
            >
              {name}
            </button>
          ))}
          <div className="w-[4rem] h-[4rem] flex items-center justify-center pl-2 text-white text-[3rem] bg-[#7F52BB] rounded-full">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex items-center gap-[8rem] lg:gap-[2rem]">
          <img
            src={userImg}
            alt="Chrome Icon"
            className="w-[16rem] sm:w-[12rem] md:w-[10rem] lg:w-[8rem] xl:w-[6rem] rounded-[100%]"
          />
          <IoMenu className="text-[16rem] sm:text-[10rem] md:text-[8rem] lg:text-[6rem] xl:text-[4rem] text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* body */}
      <div className="flex px-[24rem] py-[8rem]">
        {/* Image */}
        <div className="flex flex-col items-start w-[32rem]">
          <a
            href={url}
            target="black"
            className="text-white text-start text-[2.5rem] hover:text-sky-500"
          >
            View Original
          </a>
          <img
            src={newImg}
            alt=""
            className="w-full h-[20rem] object-cover rounded-[2rem]"
          />
        </div>

        <div className="flex flex-1 px-[8rem]">
          {content === 0 && (
            // Full Article
            <div className="text-white">
              {/* title */}
              <h1 className="text-[4rem] text-left font-bold">{title}</h1>
              {/* Summary */}
              <div className="flex flex-col gap-[2rem] mt-[4rem]">
                {summary.map((item, index) => (
                  <p
                    key={index}
                    className="text-gray-300 text-left text-[2.3rem]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}
          {content === 1 && (
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
                      "w-full flex justify-between items-center px-[2rem] py-[1rem] rounded-[1rem] text-left text-[2rem] cursor-pointer border",
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
                          onClick={() =>
                            setIsShowCorrectAnswer(!isShowCorrectAnswer)
                          }
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
              ) : (
                <button
                  onClick={handleNextQuiz}
                  className="bg-[#FFC36D] text-[1.8rem] border-none focus:outline-none active:bg-yellow-300 text-black"
                >
                  NEXT QUESTION
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
                          onClick={() =>
                            setIsShowCorrectAnswer(!isShowCorrectAnswer)
                          }
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
        <div className="w-[32rem]">
          {/* Related Collections */}
          <div className="flex flex-col items-start text-white">
            <span className="text-start text-[3rem] font-bold">
              Related Collections
            </span>
            <ul className="ml-[2rem]">
              {collections.map((keyword, index) => (
                <li key={index} className="text-gray-300 text-left text-[2rem]">
                  {keyword}
                </li>
              ))}
            </ul>
          </div>

          {/* Related Lurnies */}
          <div className="mt-[4rem] flex flex-col items-start text-white">
            <span className="text-start text-[3rem] font-bold">
              Related Lurnies
            </span>
            {/* <div className="flex flex-col gap-[1.5rem]">
              {relatedLurnies.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[2rem] cursor-pointer"
                >
                  <img src={item.img} alt="lurny image" className="w-[10rem]" />
                  <span className="text-[1.5rem] text-left flex flex-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// LurnyQuiz.propTypes = {};

export default LurnyQuiz;
