import { IoMenu } from "react-icons/io5";

// import Image1 from "../assets/images/home/home1.png";
import Image2 from "../assets/images/home/home4.png";
import Image3 from "../assets/images/home/home2.png";
import Image4 from "../assets/images/home/home5.png";
import Image5 from "../assets/images/home/home6.png";
import Image6 from "../assets/images/home/home7.png";
import Image7 from "../assets/images/home/home8.png";
import Image8 from "../assets/images/home/home9.png";

import userImg from "../assets/images/home/User.png";
import playIcon from "../assets/icons/play-icon.png";
import FaqComponent from "../components/FaqComponent";
import Header from "../components/Header";

export default function Home() {
  const getYouTubeID = (url) => {
    const regExp =
      /^.*(youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:(?:v|e)\/|(?:watch|embed(?:\/popup)?)(?:\.php)?\?v=|\/(?:[a-z]{2}\/)?video\/))([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }

    return null;
  };

  const Video = "https://www.youtube.com/watch?v=iyabl4dlxbY";
  return (
    <div className="flex flex-col font-raleway">
      <Header />
      <div className="bg-neutral-800 py-[8rem] px-[20rem] flex flex-wrap items-center">
        <div className="w-full sm:w-1/3 relative">
          {/* <img
            src={Image1}
            alt="Image1"
            className="w-full object-cover mx-auto"
          /> */}
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeID(Video)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Upload"
            className="inline-block w-full h-full object-cover mx-auto"
          />
        </div>
        <div className="w-2/3 flex-auto flex flex-col items-start justify-between gap-[4rem] sm:gap-[2rem] mt-[4rem] sm:mt-0 sm:pl-[6rem]">
          <p className="text-white text-[10rem] sm:text-[4.5rem] font-medium">
            What is Lurny?
          </p>
          <p className="text-gray-300 text-[6rem] sm:text-[2.3rem] text-left">
            Lurny is an innovative AI-powered platform that transforms long-form
            web content, including articles and videos, into concise, digestible
            microlessons complemented by interactive multiple choice quizzes for
            efficient learning and assessment.
          </p>
          <p className="text-gray-300 text-[6rem] sm:text-[2.3rem] text-left">
            Enhanced with ROSI, a spaced repetition algorithm inspired by the
            Fibonacci sequence, Lurny optimizes learning and memory
            retention,offering a sophisticated, personalized learning journey.
          </p>
          <span className="text-[#FFC36D]  text-[6rem] sm:text-[2.3rem] flex items-center gap-2">
            <IoMenu /> <span>LEARN MORE</span>
          </span>
        </div>
      </div>

      <div className="w-full bg-[#FFC36D] py-[16rem] sm:py-[8rem] px-[8rem] sm:px-[24rem] lg:px-[40rem] flex flex-col gap-[8rem] sm:gap-[2rem] items-center">
        <p className="text-black text-[10rem] sm:text-[6rem] md:text-[4rem] leading-[10rem] font-bold font-raleway">
          Turn Curiosity into Knowledge - One Lurny at a Time
        </p>
        <p className="w-full text-black px-[8rem] text-[6rem] sm:text-[3rem] md:text-[2rem]">
          Unleash the power of learning with a click! Experience how any webpage
          or video is instantly transformed into a concise, interactive lesson -
          ready for you to explore and learn. Start your journey towards
          smarter, quicker, and more engaging learning now.
        </p>
        <div className="w-full flex px-[4rem]">
          <input
            type="text"
            className="w-full px-[2rem] focus:outline-none text-[6rem] md:text-[2rem]"
            placeholder="Input any web or YouTube URL and watch the transformation unfold!"
          />
          <span className="bg-[#7F52BB] px-[6rem] py-[4rem] sm:py-[re3m] md:py-[1.5rem] text-[6rem] md:text-[3rem] text-white font-bold cursor-pointer select-none">
            StubIT
          </span>
        </div>
        <div className="flex items-center gap-[2rem] mt-24">
          <img
            src={Image2}
            alt="Chrome icon"
            className="w-[8rem] sm:w-[4rem]"
          />
          <a
            href="#"
            className="text-black text-[5rem] sm:text-[3rem] lg:text-[2rem] font-light underline"
          >
            OR INSTALL THE LURNY CHROME EXTENSION BY CLICKING HERE
          </a>
        </div>
      </div>

      <div className="bg-[#7F52BB] w-full pl-[24rem] pr-[12rem] flex flex-wrap">
        <div className="w-full sm:w-7/12 flex flex-col items-start gap-[8rem] sm:gap-[4rem] py-[16rem] sm:py-[8rem]">
          <p className="text-white text-center sm:text-left text-[10rem] sm:text-[6rem] md:text-[4.5rem] leading-[10rem] font-semibold">
            How it works - The Magic behind Lurny
          </p>
          <p className="text-gray-200 text-center sm:text-justify text-[6rem] sm:text-[2.5rem] leading-[7.5rem] sm:leading-[3rem]">
            Dive into the heart of Lurny and discover the innovative process
            that turns everyday online content into interactive and engaging
            learning experiences Our short video below will walk you through the
            seamless journey from a simple webpage or YouTube video to a
            comprehensive Lurny - a transformation that unveils the future of
            learning Witness firsthand how StubIT, ROSI. and Socritic work
            together to curate personalized learning paths, enhance memory
            retention, and foster critical thinking.
          </p>
          <p className="text-[8rem] sm:text-[3rem] text-center sm:text-justify text-white font-light leading-[8.5rem] sm:leading-[3.5rem]">
            Ready to experience learning like never before? Watch now and see
            the magic unfold!
          </p>
        </div>
        <div className="w-5/12 hidden sm:flex relative">
          <img src={Image3} alt="image3" className="object-cover" />
          <div className=" absolute left-[8rem] top-[10rem]">
            <img src={playIcon} alt="Play icon" className="w-[8rem]" />
          </div>
        </div>
      </div>

      <div className="bg-[#FFC36D] px-[8rem] sm:px-[24rem] py-[16rem] sm:py-[8rem]">
        <h2 className="text-black text-[10rem] sm:text-[6rem] md:text-[4.5rem] leading-[10rem] font-semibold">
          Unveil the Core of Lurny - Transformative Features Unlocked
        </h2>
        <p className="text-black text-[6rem] sm:text-[3rem] md:text-[2rem] mt-[4rem] sm:mt-0 leading-[6.5rem] sm:leading-[2.5rem]">
          Discover the ingenious elements that make Lurny a revolutionary
          learning experience. Each feature is designed to empower your journey
          through knowledge, making every lesson not just a learning moment but
          a memorable adventure. Let’s dive into the essence of Lurny
        </p>
        <div className="flex flex-wrap gap-[16rem] md:gap-[8rem] lg:gap-[4rem] justify-center my-[12rem] sm:my-[6rem]">
          <div className="w-[120rem] sm:w-[64rem] md:w-[56rem] lg:w-[48rem] xl:w-[34rem] bg-white rounded-[3rem] px-[12rem] pb-[12rem] sm:px-[2rem] sm:pb-[2rem] flex flex-col justify-start items-start">
            <img src={Image4} alt="" className="h-[24rem] lg:h-[12rem]" />
            <span className="text-[#7F52BB] text-[8rem] sm:text-[6rem] md:text-[5rem] lg:text-[3rem] font-bold">
              StubIT
            </span>
            <span className="text-black text-left text-[8rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] font-bold leading-[8.5rem] sm:leading-[4.5rem] md-leading-[3rem] lg:leading-[2.5rem]">
              Your Gateway to Knowledge
            </span>
            <p className="mt-[1rem] text-black text-[6.5rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] text-left">
              Instantly convert any online content into a concise, digestible
              learning module. Witness web pages and videos etamorphose into
              engaging Lurnies with just one click
            </p>
          </div>
          <div className="w-[120rem] sm:w-[64rem] md:w-[56rem] lg:w-[48rem] xl:w-[34rem] bg-white rounded-[3rem] px-[12rem] pb-[12rem] sm:px-[2rem] sm:pb-[2rem] flex flex-col justify-start items-start">
            <img src={Image5} alt="" className="h-[24rem] lg:h-[12rem]" />
            <span className="text-[#7F52BB] text-[8rem] sm:text-[6rem] md:text-[5rem] lg:text-[3rem] font-bold">
              ROSI
            </span>
            <span className="text-black text-left text-[8rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] font-bold leading-[8.5rem] sm:leading-[4.5rem] md-leading-[3rem] lg:leading-[2.5rem]">
              Memory, Mastered
            </span>
            <p className="mt-[1rem] text-black text-[6.5rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] text-left">
              Harness the power of our AI driven spaced repetition algorithm,
              ROSI, ensuring long term retention and mastery over the subjects
              you learn.
            </p>
          </div>
          <div className="w-[120rem] sm:w-[64rem] md:w-[56rem] lg:w-[48rem] xl:w-[34rem] bg-white rounded-[3rem] px-[12rem] pb-[12rem] sm:px-[2rem] sm:pb-[2rem] flex flex-col justify-start items-start">
            <img src={Image6} alt="" className="h-[24rem] lg:h-[12rem]" />
            <span className="text-[#7F52BB] text-[8rem] sm:text-[6rem] md:text-[5rem] lg:text-[3rem] font-bold">
              Quizzify
            </span>
            <span className="text-black text-left text-[8rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] font-bold leading-[8.5rem] sm:leading-[4.5rem] md-leading-[3rem] lg:leading-[2.5rem]">
              Challenge Your Understanding
            </span>
            <p className="mt-[1rem] text-black text-[6.5rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] text-left">
              Interactive quizzes generated from your Lurnies test your
              knowledge, offering immediate feedback to reinforce learning and
              deepen understanding.
            </p>
          </div>
          <div className="w-[120rem] sm:w-[64rem] md:w-[56rem] lg:w-[48rem] xl:w-[34rem] bg-white rounded-[3rem] px-[12rem] pb-[12rem] sm:px-[2rem] sm:pb-[2rem] flex flex-col justify-start items-start">
            <img src={Image7} alt="" className="h-[24rem] lg:h-[12rem]" />
            <span className="text-[#7F52BB] text-[8rem] sm:text-[6rem] md:text-[5rem] lg:text-[3rem] font-bold">
              Socritic
            </span>
            <span className="text-black text-left text-[8rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] font-bold leading-[8.5rem] sm:leading-[4.5rem] md-leading-[3rem] lg:leading-[2.5rem]">
              Engage in Deeper Learning
            </span>
            <p className="mt-[1rem] text-black text-[6.5rem] sm:text-[4rem] md:text-[2.5rem] lg:text-[2rem] text-left">
              Foster critical thinking with Socritic’s reflective questioning,
              engaging in meaningful dialogues with our AI to deepen your
              comprehension and analytical skills
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4rem] lg:gap-[2rem] items-center">
          <span className="text-[8rem] sm:text-[4rem] md:text-[3rem]">
            Ready to transform how you learn?
          </span>
          <span className="text-[6rem] sm:text-[3rem] md:text-[2rem]">
            Jump into the world of Lurny and start your journey towards smarter,
            faster, and more effective learning today!
          </span>
          <button className="w-[72rem] sm:w-[32rem] xl:w-[24rem] bg-[#7F52BB] text-[8rem] sm:text-[4rem] lg:text-[3rem] xl:text-[2rem] font-bold text-white focus:outline-none">
            Join Lurny
          </button>
        </div>
      </div>

      <div className="bg-white px-[8rem] sm:px-[24rem] py-[16rem] sm:py-[8rem] flex flex-wrap">
        <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-start gap-[8rem] sm:gap-[4rem]">
          <h2 className="px-[4rem] sm:px-0 text-black leading-[10rem] sm:leading-[5rem] text-center sm:text-left text-[10rem] sm:text-[5rem] md:text-[3rem] lg:text-[3.5rem] font-bold">
            What our learners say about the Lurny learning platform
          </h2>
          <p className="text-black text-center sm:text-left text-[6rem] sm:text-[3.5rem] md:text-[2rem]">
            From curious minds seeking knowledge to educators creating impactful
            learning objects, our community’s journey is a testament to the
            boundless possibilities Lurny offers. Here’s what they have to say:
          </p>
          <button className="w-[72rem] sm:w-[32rem] xl:w-[24rem] bg-[#7F52BB] text-[8rem] sm:text-[4rem] lg:text-[3rem] xl:text-[2rem] font-bold text-white focus:outline-none">
            View All
          </button>
        </div>
        <div className="w-full sm:w-3/4 my-[12rem] sm:my-0 flex flex-wrap overflow-hidden justify-center gap-[8rem] sm:gap-[2rem] ">
          {/* User testinomial card */}
          <div className="w-[120rem] sm:w-[32rem] h-[180rem] sm:h-[50rem] p-[12rem] sm:p-[4rem] bg-gray-100 rounded-[2rem] flex flex-col justify-between gap-[12rem] sm:gap-0">
            <div className="flex flex-col items-start gap-[12rem] sm:gap-[2rem]">
              <img
                src={userImg}
                alt="User avatar"
                className="rounded-full w-[28rem] sm:w-[8rem]"
              />
              <p className="text-black text-left text-[7rem] sm:text-[3rem] md:text-[1.8rem]">
                Using Lurny to distill complex research into digestible has
                revolutionized how I share knowledge. It&#39;s gratifying to see
                my work sparking curiosity across the globe.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-black font-bold text-left text-[8rem] sm:text-[4rem] md:text-[2rem]">
                Dr. Anika Mehta
              </span>
              <span className="text-black text-left text-[7rem] sm:text-[3rem] md:text-[1.8rem]">
                Environmental Scientist
              </span>
            </div>
          </div>
          {/* User testinomial card */}
          <div className="w-[120rem] sm:w-[32rem] h-[180rem] sm:h-[50rem] p-[12rem] sm:p-[4rem] bg-gray-100 rounded-[2rem] flex flex-col justify-between gap-[12rem] sm:gap-0">
            <div className="flex flex-col items-start gap-[12rem] sm:gap-[2rem]">
              <img
                src={userImg}
                alt="User avatar"
                className="rounded-full w-[28rem] sm:w-[8rem]"
              />
              <p className="text-black text-left text-[7rem] sm:text-[3rem] md:text-[1.8rem]">
                Lurny has transformed my teaching approach, enabling me to reach
                students beyond my classroom. The interactive quizzes and paced
                repetition ensure my lessons are both engaging and memorable.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-black font-bold text-left text-[8rem] sm:text-[4rem] md:text-[2rem]">
                Prof. Rajiv Desai
              </span>
              <span className="text-black text-left text-[7rem] sm:text-[3rem] md:text-[1.8rem]">
                Economics Professor
              </span>
            </div>
          </div>
          {/* User testinomial card */}
          <div className="w-[120rem] sm:w-[32rem] h-[180rem] sm:h-[50rem] p-[12rem] sm:p-[4rem] bg-gray-100 rounded-[2rem] flex flex-col justify-between gap-[12rem] sm:gap-0">
            <div className="flex flex-col items-start gap-[12rem] sm:gap-[2rem]">
              <img
                src={userImg}
                alt="User avatar"
                className="rounded-full w-[28rem] sm:w-[8rem]"
              />
              <p className="text-black text-left text-[7rem] sm:text-[3rem] md:text-[1.8rem]">
                As a lifelong learner, Lurny has been a game library of topics
                and the ease of accessing them anytime have made learning n
                integral part of my daily routine.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-black font-bold text-left text-[8rem] sm:text-[4rem] md:text-[2rem]">
                Priya Kumar
              </span>
              <span className="text-black text-left text-[7rem] sm:text-[3rem] md:text-[1.8rem]">
                Learner
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-[#F2F2F2] px-[8rem] sm:px-[16rem] py-[16rem] sm:py-[8rem]">
        <h2 className="text-[10rem] sm:text-[6rem] md:text-[4rem] text-black font-bold">
          Frequently Asked Questions
        </h2>
        <div className="w-full mt-[4rem] flex items-start">
          <div className="w-1/2 pr-[12rem] hidden md:flex items-start">
            <img
              src={Image8}
              alt="Frequently Asked Questions Image"
              className="w-4/5 object-cover mx-auto"
            />
          </div>

          <div className="w-full md:w-1/2">
            <FaqComponent />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#7F52BB] px-[8rem] sm:px-[24rem] py-[16rem] sm:py-[6rem] text-white">
        <div className="flex flex-col items-center gap-[4rem] sm:gap-[2rem]">
          <span className="text-[10rem] sm:text-[6rem] md:text-[4rem] text-center leading-[10rem] font-semibold">
            Embark on Your Lurny Adventure
          </span>
          <span className="text-[8rem] sm:text-[4rem] md:text-[2.5rem] text-center leading-[8.5rem] sm:leading-[4.5rem]">
            Ready to transform the way you learn? It all starts with a single
            click.
          </span>
          <span className="text-[6rem] sm:text-[1.8rem] leading-[7.5rem] sm:leading-[3rem]">
            Download the StubIT Chrome extension right now to dive into a
            universe of knowledge designed to fit perfectly into your life.
          </span>
        </div>
      </div>
    </div>
  );
}
