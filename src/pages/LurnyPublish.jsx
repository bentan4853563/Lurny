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
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedMedias, setSelectedMedias] = useState([]); // Assuming "Video" is another possible type
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([{ category: "", count: 0 }]);
  const [media, setMedia] = useState([{ media: "", count: 0 }]);

  // Pagenation state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Adjust as needed
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
    if (location.category) {
      console.log(location.state.category);
      setSelectedCategories(location.state.category);
    }
  }, [location]);

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

  useEffect(() => {
    const filterByCategoryAndMedia = (lurny) => {
      const matchesCategories =
        selectedCategories.includes("All") ||
        lurny.collections.some((category) =>
          selectedCategories.includes(category)
        );

      const isYoutube = isYoutubeUrl(lurny.url);
      const matchesMedias = selectedMedias.includes(
        isYoutube ? "Video" : "Web Page"
      );

      return matchesCategories && matchesMedias;
    };

    const sortByCategory = (a, b) => {
      const categoryA = a.collections[0].toLowerCase();
      const categoryB = b.collections[0].toLowerCase(); // Corrected typo here
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
      return 0;
    };

    const filteredAndSortedLurnies = lurnies
      .filter(filterByCategoryAndMedia)
      .sort(sortByCategory); // Corrected method call here

    setFilteredLurnies(filteredAndSortedLurnies);
  }, [selectedCategories, selectedMedias, lurnies]);

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
      <div className="w-full bg-[#2E2E2E] flex flex-col items-center text-white py-[4rem] sm:py-[3rem] lg:py-[2rem]">
        <div className="w-4/5 flex flex-wrap justify-center gap-[2rem] text-[12rem] lg:text-[4rem] font-bold">
          {selectedCategories.length > 0 &&
            selectedCategories.map((category, index) => (
              <span key={index}>{category}</span>
            ))}
        </div>
        <span className="text-[8rem] lg:text-[2.5rem] font-medium">
          {lurnies.length} Lurnies and counting…
        </span>
      </div>
      <div className="w-full bg-[#262626] flex flex-1 p-[12rem] sm:p-[6rem] gap-[12rem] sm:gap-[4rem]">
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
          <div className="flex flex-wrap justify-start gap-[8rem] lg:gap-[2rem]">
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
