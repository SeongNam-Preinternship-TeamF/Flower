import React from "react";
import "../css/Result.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Result = () => {
  return (
    <div className="w-full">
      <p
        className="w-full flex justify-center font-bold mt-4 text-4xl"
        style={{ letterSpacing: "1em" }}
      >
        앞으로{" "}
        <span style={{ letterSpacing: "1em", color: "#E37B7B" }}>꽃길</span>만
        걷자
      </p>
      <img
        className="w-200 flex justify-center mx-auto mt-4 rounded-4xl"
        alt="flower"
        src="https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg"
      />
      <div className="w-full flex justify-center font-bold mt-4">
        결과페이지 분갈이 꽃말, 꽃 이름 일조량 물주기주기
      </div>
    </div>
  );
};
export default Result;
