import React from "react";

const SearchBox = ({ title, content }) => {
  return (
    <div className=" hover:border-yellow-600 flex-shrink-0 w-80 mx-8 h-80 shadow-lg rounded-2xl mt-16 bg-opacity-25 bg-gray-300">
      {content}content
      <div className="mt-1 font-normal p-2">{title} title</div>
    </div>
  );
};
export default SearchBox;
