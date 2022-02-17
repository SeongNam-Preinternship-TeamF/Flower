import React from "react";
import "../css/Result.css";

const ResultBox = ({ title, content }) => {
  return (
    <div
      className="mx-auto h-24 w-5/6 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center"
      style={{ backgroundColor: "#F0F0F0" }}
    >
      {title}
      <div className="mt-1 font-normal text-center p-2">{content}</div>
    </div>
  );
};
export default ResultBox;
