import React from "react";
import "../css/Result.css";

const ResultBox = ({ title, content }) => {
  return (
    <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
      {title}
      <div className="mt-1 font-normal text-center p-2">{content}</div>
    </div>
  );
};
export default ResultBox;
