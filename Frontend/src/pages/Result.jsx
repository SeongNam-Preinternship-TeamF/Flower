import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Result.css";
import ResultBox from "./ResultBox";
//import { constants } from "../utils/constants";

const Result = () => {
  const { imageId } = useParams();
  const [flowerInfo, setFlowerInfo] = useState({
    id: "",
    name: "",
    flowerMeaning: "",
    water: "",
    caution: "",
    sunlight: "",
    imgURL: "",
  });

  // useEffect(() => {
  //   if (imageId === "1") setFlowerInfo(constants.FLOWER_RESULT[0]);
  //   if (imageId === "2") setFlowerInfo(constants.FLOWER_RESULT[1]);
  // }, []);

  const onSubmit = (img) => {
    axios
      .get(`http://localhost:5001/api/v1/analyze?id=${img}`)
      .then((response) => {
        console.log(response);
        setFlowerInfo(response.data);
      })
      .catch((error) => {
        alert("이미지 로딩 실패");
      });
  };

  useEffect(() => {
    onSubmit(imageId);
  }, [imageId]);

  return (
    <div className="w-full">
      <p
        className="w-full flex justify-center font-bold mt-4 text-4xl"
        style={{ letterSpacing: "0.7em" }}
      >
        앞으로{" "}
        <span style={{ letterSpacing: "0.7em", color: "#dd6d22" }}> 꽃길</span>
        만 걷자
      </p>
      <img
        className="w-32rem flex justify-center mx-auto mt-8"
        style={{ borderRadius: "4rem" }}
        alt="flower"
        src={flowerInfo.imgURL}
      />
      <div className="flex justify-center mt-4 font-extrabold text-3xl text-yellow-600">
        "{flowerInfo.name}"
      </div>
      <ResultBox title="꽃말" content={flowerInfo.flowerMeaning} />
      <ResultBox title="물주기" content={flowerInfo.water} />
      <ResultBox title="일조량" content={flowerInfo.sunlight} />
      <ResultBox title="주의 사항" content={flowerInfo.caution} />
      <div className="mb-16"></div>
    </div>
  );
};
export default Result;
