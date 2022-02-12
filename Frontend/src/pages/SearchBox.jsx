import React from "react";

const SearchBox = ({ title, content }) => {
  return (
    <div className=" hover:border-yellow-600 flex-shrink-0 w-80 mx-8 h-80 shadow-lg rounded-2xl mt-28 bg-opacity-25 bg-gray-300">
      {title} title
      <div className="mt-1 font-normal p-2">{content} content</div>
    </div>
  );
};
export default SearchBox;
