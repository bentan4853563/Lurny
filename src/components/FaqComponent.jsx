import { useState } from "react";
import FaqItem from "./FaqItem";

const FaqComponent = () => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const handleToggle = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "What is Lurny?",
      answer:
        "A Lurny is a bite sized knowledge object that transforms any online content, including videos and articles, into an engaging, interactive microlesson. Each Lurny includes a concise summary and a set of interactive quizzes to test your understanding, all designed to make learning quick, enjoyable, and effective.",
    },
    {
      id: 2,
      question: "Can I use Lurny without the Chrome extension?",
      answer:
        "If Lurny has a web-based platform, a mobile app, or integration with other browsers or tools, then you might be able to use some of its features without the Chrome extension. However, if Lurny is exclusively a Chrome extension, then its usage would be inherently tied to the Chrome browser and it would not function outside of that context.",
    },
    {
      id: 3,
      question: "How does the StubIT Chrome extension work?",
      answer:
        "The 'StubIT' Chrome extension you're referring to doesn't appear to be a well-known or widely recognized extension based on the information available up to my last update in early 2023. If it's a niche or new extension, or possibly misspelled or misremembered, that would explain the lack of information.",
    },
    {
      id: 4,
      question: "What is the ROSI algorithm and how does it help me learn?",
      answer:
        "ROSI, which stands for Return on Security Investment, is not an algorithm meant for learning in the educational sense. Instead, it is a concept used in the field of information security management to quantify the effectiveness of security measures. The goal of ROSI is to help organizations understand the financial benefits of investing in security controls by comparing the cost of these controls against the potential losses that could occur from security incidents.",
    },
    // Add more FAQs here
  ];
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-full flex flex-col gap-[4rem] px-[8rem] sm:px-0 md:gap-[1.5rem] my-[8rem] sm:my-0">
        {faqs.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            isOpen={faq.id === openFaqId}
            onToggle={() => handleToggle(faq.id)}
          />
        ))}
      </div>
      <button className="w-[72rem] sm:w-[36rem] xl:w-[24rem] bg-[#7F52BB] mt-[4rem] text-[8rem] sm:text-[4rem] lg:text-[3rem] xl:text-[2rem] font-bold text-white focus:outline-none">
        See All FAQs
      </button>
    </div>
  );
};

export default FaqComponent;
