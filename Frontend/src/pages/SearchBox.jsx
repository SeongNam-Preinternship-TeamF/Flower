import React from "react";

const SearchBox = ({ title, content, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" flex-shrink-0 w-80 mx-8 h-80 shadow-lg rounded-2xl mt-16 bg-opacity-25 bg-gray-300"
    >
      <img src={content} alt="결과미리보기" />
      <div className=" mt-1 font-bold ml-32 p-2">{title}</div>
    </div>
  );
};
export default SearchBox;
