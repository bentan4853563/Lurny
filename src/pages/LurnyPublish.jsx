import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoIosArrowForward } from "react-icons/io";

import { useLurnyStore } from "../stores/lurnyStore";

import LurnyHeader from "../components/LurnyHeader";
import LurnyItem from "../components/LurnyItem";
import FilterPan from "../components/FilterPan";
import NewPagination from "../components/NewPagination";
import { useLocation } from "react-router-dom";
// import Pagination from "../components/Pagination";

const LurnyPublish = () => {
  const location = useLocation();

  const { lurnies, setLurnies, clearLurnies } = useLurnyStore();
  const [showFilter, setShowFilter] = useState(false);
  const [filteredLurnies, setFilteredLurnies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMedias, setSelectedMedias] = useState([]); // Assuming "Video" is another possible type
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([{ category: "", count: 0 }]);
  const [media, setMedia] = useState([{ media: "", count: 0 }]);

  console.log("lurnies", lurnies);
  // Pagenation state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust as needed
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLurnies.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getLurnies();
    return () => {
      clearLurnies();
    };
  }, []);

  useEffect(() => {
    // Check if location.state exists and if it has the category property
    if (location.state && location.state.category) {
      setSelectedCategories([location.state.category]);
    }
  }, [location]); // Add 'location' as a dependency here

  // set media
  useEffect(() => {
    if (lurnies.length > 0) {
      const newMedia = lurnies.reduce((accumulator, lurny) => {
        const mediaType = isYoutubeUrl(lurny.url) ? "Video" : "Web Page"; // Replace "Other" with appropriate default type
        const existingMedia = accumulator.find((m) => m.media === mediaType);
        if (existingMedia) {
          existingMedia.count++;
        } else {
          accumulator.push({ media: mediaType, count: 1 });
        }
        return accumulator;
      }, []);
      setMedia(newMedia);
      setSelectedMedias(newMedia.map((m) => m.media));
    }
  }, [lurnies]);

  useEffect(() => {
    if (lurnies.length > 0) {
      if (selectedCategories.length === 0) {
        setFilteredLurnies(lurnies);
      } else {
        const tempLurnies = lurnies.filter((lurny) =>
          selectedCategories.some((selectedCategory) =>
            lurny.collections.includes(selectedCategory)
          )
        );
        setFilteredLurnies(tempLurnies);
      }
    }
  }, [lurnies, selectedCategories]);

  useEffect(() => {
    const categoryMatchesSearchTerm = (category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const newCategories = lurnies
      .filter((lurny) => {
        // Check if the lurny matches the selected media types
        const isYoutube = isYoutubeUrl(lurny.url);
        return selectedMedias.includes(isYoutube ? "Video" : "Web Page");
      })
      .reduce((accumulator, lurny) => {
        // Go through each collection/category in the lurny
        lurny.collections.forEach((category) => {
          if (!categoryMatchesSearchTerm(category)) {
            return;
          }

          // Find if the category already exists in the accumulator
          const existingCategory = accumulator.find(
            (c) => c.category === category
          );

          if (existingCategory) {
            // Increment count if category already exists
            existingCategory.count++;
          } else {
            // Otherwise, add a new category with count 1 to the accumulator
            accumulator.push({ category: category, count: 1 });
          }
        });

        return accumulator; // Return the accumulator for the next iteration
      }, []); // Start with an empty array as the accumulator

    // Set the categories with the reduced result
    setCategories(newCategories);
  }, [selectedMedias, searchTerm, lurnies]);

  useEffect(() => {
    const categoryMatchesSearchTerm = (category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const newCategories = lurnies
      .filter((lurny) => {
        // First, check if the lurny matches the selected media types
        const isYoutube = isYoutubeUrl(lurny.url);
        const matchesMedias = selectedMedias.includes(
          isYoutube ? "Video" : "Web Page"
        );

        return matchesMedias;
      })
      .reduce((accumulator, lurny) => {
        // Then, go through each collection/category in the lurny
        lurny.collections.forEach((category) => {
          if (!categoryMatchesSearchTerm(category)) {
            return;
          }

          // Find if the category already exists in the accumulator
          const existingCategory = accumulator.find(
            (c) => c.category === category
          );

          if (existingCategory) {
            // Increment count if category already exists
            existingCategory.count++;
          } else {
            // Otherwise, add a new category with count 1 to the accumulator
            accumulator.push({ category: category, count: 1 });
          }
        });

        return accumulator;
      }, []);

    setCategories(newCategories);
  }, [selectedMedias, searchTerm, lurnies]);

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

  const isYoutubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <div className="w-full h-[100vh] font-raleway">
      <LurnyHeader />
      <ToastContainer className="text-start" />
      <div className="w-full bg-[#2E2E2E] flex flex-col gap-[3rem] items-center text-white py-[4rem] sm:py-[3rem] lg:py-[2rem]">
        <div className="w-4/5 flex flex-wrap justify-center gap-[2rem] text-[12rem] lg:text-[4rem] font-bold">
          {selectedCategories.length > 0 &&
            selectedCategories.map((category, index) => (
              <span key={index} className="leading:[12.5rem] lg:leading-[3rem]">
                {category}
                {index < selectedCategories.length - 1 && <span>,</span>}
              </span>
            ))}
        </div>
        <span className="text-[8rem] lg:text-[2.5rem] font-medium">
          {filteredLurnies.length} Lurnies and counting…
        </span>
      </div>
      <div className="w-full bg-[#262626] flex px-[12rem] py-[4rem] justify-between">
        {/* Toggle button for mobile */}
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="h-full bg-transparent sm:hidden fixed bottom-0 left-0 flex items-center z-50"
        >
          <IoIosArrowForward
            className={`text-[12rem] text-white hover:translate-x-[2rem] hover:duration-300 ${
              showFilter
                ? "rotate-180 hover:translate-x-[-2rem] hover:duration-300"
                : ""
            }`}
          />
        </div>

        {/* FilterPan is hidden on small screens initially */}
        <div className={`${showFilter ? "absolute" : "hidden"} sm:block`}>
          <FilterPan
            media={media}
            changeMedia={(selectedItems) => setSelectedMedias(selectedItems)}
            categories={categories}
            changeCategory={(selectedItems) =>
              setSelectedCategories(selectedItems)
            }
            searchCategory={(value) => setSearchTerm(value)}
          />
        </div>

        <div className="w-full flex flex-col justify-between items-start">
          <div className="flex flex-wrap ml-[6rem] justify-start gap-[8rem] lg:gap-[2rem]">
            {currentItems.map(
              (lurny, index) =>
                lurny.shared && <LurnyItem key={index} data={lurny} />
            )}
          </div>
          <NewPagination
            totalItems={filteredLurnies.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            paginate={(value) => paginate(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LurnyPublish;
