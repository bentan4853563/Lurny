import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function FilterPan({
  media,
  changeMedia,
  categories,
  changeCategory,
  searchCategory,
}) {
  // const categoryList = [
  //   {
  //     category: "Art & Design",
  //     count: 345,
  //   },
  //   {
  //     category: "Business",
  //     count: 345,
  //   },
  //   {
  //     category: "Data Science",
  //     count: 634,
  //   },
  //   {
  //     category: "Artificial Intelligence",
  //     count: 7753,
  //   },
  //   {
  //     category: "Green Energy",
  //     count: 43,
  //   },
  //   {
  //     category: "Business Consulting",
  //     count: 853,
  //   },
  // ];

  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedMedias, setSelectedMedias] = useState(new Set());
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const initialMedias = new Set(media.map((mediaItem) => mediaItem.media));
    setSelectedMedias(initialMedias);
  }, [media]);

  const toggleCategory = (category) => {
    const newSelection = new Set(selectedCategories);
    if (newSelection.has(category)) {
      newSelection.delete(category);
    } else {
      newSelection.add(category);
    }
    setSelectedCategories(newSelection);
    changeCategory(Array.from(newSelection)); // Convert Set to Array and pass to parent
  };

  const toggleMedia = (mediaType) => {
    const newSelection = new Set(selectedMedias);
    if (newSelection.has(mediaType)) {
      newSelection.delete(mediaType);
    } else {
      newSelection.add(mediaType);
    }
    setSelectedMedias(newSelection);
    changeMedia(Array.from(newSelection));
  };

  const handleChangeSearch = (value) => {
    setSearchInput(value);
    searchCategory(value);
  };

  return (
    <div className="min-w-[32rem] w-[140rem] sm:w-[72rem] lg:w-[36rem]  bg-[#262626] flex flex-col items-center gap-[8rem] lg:gap-[2rem]">
      {/* Category Filter */}
      <div className="w-full px-[10rem] sm:px-[6rem] lg:px-[2.5rem] py-[4rem] lg:py-0 bg-[#2E2E2E] rounded-[1.5rem] flex flex-col items-start">
        <span className="text-white text-start text-[10rem] sm:text-[5rem] lg:text-[2rem]  my-[2rem] select-none">
          Filter by Category
        </span>
        <input
          type="text"
          value={searchInput}
          placeholder="Please Enter Keyword"
          className="w-full bg-[#494949] px-[1.5rem] py-[0.5rem] text-white placeholder-gray-400 text-[1.5rem] rounded-md mb-[1rem]"
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
        <div className="w-full h-[30vh] overflow-y-auto flex flex-col my-[4rem] lg:my-0">
          {categories.length > 0 &&
            categories.map((item, index) => {
              const isSelected = selectedCategories.has(item.category);
              return (
                <div
                  key={index}
                  className="w-full flex items-center my-[4rem] sm:my-[2rem] lg:my-[1rem] gap-[4rem] lg:gap-[1.5rem] cursor-pointer"
                  onClick={() => toggleCategory(item.category)}
                >
                  <div
                    className={`w-[8rem] h-[8rem] sm:w-[6rem] sm:h-[6rem] lg:w-[2.3rem] lg:h-[2.3rem]  flex shrink-0 ${
                      isSelected ? "bg-[#7030A0]" : "bg-white"
                    } border border-white rounded-[1.5rem] lg:rounded-[0.5rem]`}
                  ></div>
                  <span className="w-full text-white text-start text-[8rem] sm:text-[4rem] lg:text-[1.5rem] select-none truncate">
                    {item.category}({item.count})
                  </span>
                </div>
              );
            })}
        </div>
        <span className="text-[#FFC36D] text-start text-[8rem] sm:text-[5rem] lg:text-[1.5rem] my-[2rem] cursor-pointer hover:underline select-none">
          View all categories
        </span>
      </div>

      {/* Type Filter */}
      <div className="w-full px-[10rem] sm:px-[6rem] lg:px-[2.5rem] py-[4rem] lg:py-0 bg-[#2E2E2E] rounded-[1.5rem] flex flex-col items-start">
        <span className="text-white text-start text-[10rem] sm:text-[5rem] lg:text-[2rem] my-[2rem] select-none">
          Filter by Media
        </span>
        <div className="flex flex-col my-[4rem] lg:my-0  lg:mb-[1rem]">
          {media.map((item, index) => {
            const isSelected = selectedMedias.has(item.media);
            return (
              <div
                key={index}
                className="w-full flex items-center my-[4rem] sm:my-[2rem] lg:my-[1rem] gap-[4rem] lg:gap-[1.5rem] cursor-pointer truncate"
                onClick={() => toggleMedia(item.media)}
              >
                <div
                  className={`w-[8rem] h-[8rem] sm:w-[6rem] sm:h-[6rem] lg:w-[2.3rem] lg:h-[2.3rem] flex shrink-0 ${
                    isSelected ? "bg-[#7030A0]" : "bg-white"
                  } border border-white rounded-[1.5rem] lg:rounded-[0.5rem] font-sans`}
                ></div>
                <span className="text-white text-start text-[8rem] sm:text-[4rem] lg:text-[1.5rem]  select-none">
                  {item.media} ({item.count})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

FilterPan.propTypes = {
  media: PropTypes.array.isRequired,
  changeMedia: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  changeCategory: PropTypes.func.isRequired,
  searchCategory: PropTypes.func.isRequired,
};
