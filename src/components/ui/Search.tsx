import Image from "next/image";
import React, { useState } from "react";
import search from "@/images/Icons/search.png";

const Search = () => {
  const [expandSearch, setExpandSearch] = useState(false);
  const expandSearchInput = () => {
    setExpandSearch(true);
  };

  return (
    <div className="relative">
      <Image
        src={search}
        alt="search"
        className="mr-4 cursor-pointer"
        width={24}
        height={36}
        onClick={expandSearchInput}
      />
      {expandSearch && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-md shadow-md p-4"
          style={{
            transform: expandSearch ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <input
            type="search"
            className="w-full h-full p-2 pl-10 text-gray-700 placeholder-gray-400"
            placeholder="Search..."
          />
        </div>
      )}
    </div>
  );
};

export default Search;
