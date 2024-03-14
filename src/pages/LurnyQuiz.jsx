// import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import LetterLogo from "../assets/icons/letter_logo.png";
import userImg from "../assets/images/home/User.png";

import originImg from "../assets/images/Lurny/origin.png";
import lurnyImg from "../assets/images/Lurny/lurny1.png";

import { useEffect, useState } from "react";

function LurnyQuiz() {
  const [content, setContent] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [answerNumber, setAnswerNumber] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState(false);

  useEffect(() => {
    setAnswerNumber(0);
    setAnswered(false);
  }, [content, currentQuestionNumber]);

  // const collections = [
  //   "#TimeSpaceCompression",
  //   "#Globalization",
  //   "#Technology",
  //   "#Communication",
  //   "#ShrinkingWorldEffect",
  //   "#MarketAccess",
  //   "#GeographicalDistances",
  //   "#CulturalExchange",
  // ];
  // const title =
  //   "India Latest: Blowout 8.4% Economic Growth Beats GDP Forecasts";
  // const summary = [
  //   "The Indian economy has shown accelerated economic growth of over 8% in the final months of the year, driven by strong private investments and a pickup in the services sector.",
  //   "However, there is a notable concern regarding the divergence between the GDP and Gross Value Added (GVA) numbers, with a significant 190 basis points wedge between the two.",
  //   "The GDP growth is being driven by an increase in net taxes and a slowdown in subsidies, contributing to the divergence between the headline number and the actual state of the economy.",
  //   "There is a particular focus on the agricultural sector, which contracted by 0.8% due to adverse weather conditions and the weakest monsoons in five years.",
  //   "Despite the current concerns, there are expectations for the economy to grow at 7.6% for the rest of the year, with forecasts for and institutions including the government of India and the Reserve Bank of India.",
  // ];

  const brandTitle = "Brand Extension as a Growth Strategy";

  const brandSummary = [
    "Brand extension involves stretching a brand into an adjacent or entirely new market to drive growth",
    "Classical examples of brand extension include Colgate, Nivea, and Gillette moving into closely related product categories",
    "The Weather Company and Apple showcase innovative brand extensions into entirely new markets",
    "Brand-driven innovation is increasingly seen as a key growth strategy due to saturated markets and technological disruptions",
    "Brands like Disney, Virgin, and BMW have successfully entered new markets by leveraging their distinctive brand equity",
    "Key assets for successful brand extensions include distinctive brand equity, strong customer relationships, and access to data and capabilities",
    "Successful brand extensions require careful market analysis, understanding customer needs, rapid prototyping, and an agile fail-fast approach",
  ];

  const relatedLurnies = [
    {
      img: lurnyImg,
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
    {
      img: lurnyImg,
      title:
        "Project Managers as Strategic Leaders – in the C-suite and beyond",
    },
  ];

  const brandQuiz = [
    {
      id: 1,
      question:
        "Which company used its deep weather-data assets to extend into new markets by supplying data and forecast models?",
      answers: ["The Weather Company", "Apple", "Disney", "Virgin"],
      correctAnswer: "The Weather Company",
      explanation:
        "The Weather Company utilized its detailed weather-data to supply data and forecast models that aid companies in making informed decisions, showing how companies can leverage their specific assets to enter into new markets successfully.",
    },
    {
      id: 2,
      question:
        "What effect did the introduction of the iPhone have on sales of Apple Mac computers?",
      answers: [
        "Decreased by 16 percent",
        "Stayed the same",
        "Rose by 16 percent",
        "Doubled",
      ],
      correctAnswer: "Rose by 16 percent",
      explanation:
        "The introduction of the iPhone and its resulting innovations not only achieved impressive results in their own right but also created a halo effect, significantly boosting sales of Apple Mac computers by 16 percent, a growth rate far exceeding the overall personal computer market.",
    },
    {
      id: 3,
      question:
        "Which brand ventured into the children's English-language teaching business in China?",
      answers: ["BMW", "Virgin", "Disney", "The Weather Company"],
      correctAnswer: "Disney",
      explanation:
        "Disney leveraged its brand essence, related to entertaining children and representing the American way of life, to enter the children's English-language teaching business in China, demonstrating an innovative approach to brand extension.",
    },
    {
      id: 4,
      question:
        "What sets BMW’s DriveNow car-sharing service apart from its competitors?",
      answers: [
        "The use of luxury vehicles like BMWs and Minis",
        "Offering free rides for the first month",
        "Only operating in Germany",
        "Exclusively using electric vehicles",
      ],
      correctAnswer: "The use of luxury vehicles like BMWs and Minis",
      explanation:
        "BMW differentiated DriveNow, its car-sharing service, by offering stylish BMWs and Minis, thereby not just entering a new market segment but also strengthening its brand’s perception as a provider of premium mobility solutions.",
    },
    {
      id: 5,
      question:
        "What are the three fundamental success factors for incumbents to succeed in brand extensions according to the article?",
      answers: [
        "Distinctive brand equity and trust, strong customer relationships, access to data and capabilities",
        "High marketing budget, extensive product range, global presence",
        "Innovative technology, low pricing strategy, wide distribution network",
        "Social media presence, celebrity endorsements, customer loyalty programs",
      ],
      correctAnswer:
        "Distinctive brand equity and trust, strong customer relationships, access to data and capabilities",
      explanation:
        "Incumbents succeeding in brand extensions often depend on three core strengths: distinctive brand equity and trust, strong relationships with customers, and access to data, capabilities, and other institutional assets. These factors enable them to leverage their existing advantages when entering new market segments.",
    },
  ];

  const brandCollection = [
    "#BrandExtension",
    "#Innovation",
    "#GrowthStrategy",
    "#BrandEquity",
    "#CustomerExperience",
    "#MarketEntry",
    "#RapidPrototyping",
    "#DataDrivenDecision",
    "#HaloEffect",
    "#ConsumerBehavior",
  ];

  const buttons = ["Read Full Article", "Quiz Me!", "Remember this"];

  const handleNextQuiz = () => {
    if (currentQuestionNumber < brandQuiz.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    } else {
      setCurrentQuestionNumber(0);
    }
    setAnswered(false);
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="font-raleway">
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
          <Link className="text-white text-start text-[2.5rem]">
            View Original
          </Link>
          <img src={originImg} alt="" className="w-full rouneded-[2rem]" />
        </div>

        <div className="flex flex-1 px-[8rem]">
          {content === 0 && (
            // Full Article
            <div className="text-white">
              {/* title */}
              <h1 className="text-[4rem] text-left font-bold">{brandTitle}</h1>
              {/* Summary */}
              <div className="flex flex-col gap-[2rem] mt-[4rem]">
                {brandSummary.map((item, index) => (
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
                {brandQuiz[currentQuestionNumber].question}
              </p>

              <div className="w-full flex flex-col gap-[2rem] items-start">
                {brandQuiz[currentQuestionNumber].answers.map(
                  (answer, index) => (
                    // Answer
                    <div
                      className={classNames(
                        "w-full flex justify-between items-start px-[2rem] py-[1rem] rounded-[1rem] text-left text-[2rem] cursor-pointer border",
                        answered
                          ? answerNumber === index
                            ? brandQuiz[currentQuestionNumber].correctAnswer ===
                              brandQuiz[currentQuestionNumber].answers[index]
                              ? "border-[#00AF4F]"
                              : "border-[#FF0000]"
                            : brandQuiz[currentQuestionNumber].correctAnswer ===
                              brandQuiz[currentQuestionNumber].answers[index]
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
                        brandQuiz[currentQuestionNumber].correctAnswer ===
                          brandQuiz[currentQuestionNumber].answers[index] && (
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
                        content={brandQuiz[currentQuestionNumber].explanation}
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
                  )
                )}
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
                  NEXT QUESTOIN
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
              {brandCollection.map((keyword, index) => (
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
            <div className="flex flex-col gap-[1.5rem]">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// LurnyQuiz.propTypes = {};

export default LurnyQuiz;
