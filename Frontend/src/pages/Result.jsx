import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Result.css";
import { constants } from "../utils/constants";

const Result = () => {
  const { imageId } = useParams();
  const [flowerInfo, setFlowerInfo] = useState({
    name: "",
    meaning: "",
    sunlight: "",
    water: "",
    caution: "",
  });

  useEffect(() => {
    if (imageId === "1") setFlowerInfo(constants.FLOWER_RESULT[0]);
    if (imageId === "2") setFlowerInfo(constants.FLOWER_RESULT[1]);
  }, []);

  // const onSubmit = (img) => {
  //   const formData = new FormData();
  //   formData.append("upload_files", img);
  //   setFilename(img.name);
  //   axios
  //     .post("http://localhost:5001/upload", formData)
  //     .then((response) => {
  //       console.log(response);
  //       setFlowerInfo(response.data);
  //       alert("이미지 로딩 완료");
  //     })
  //     .catch((error) => {
  //       console.log(formData);
  //       alert("이미지 로딩 실패");
  //     });
  // };

  // useEffect(() => {
  //   onSubmit(imageId);
  // }, [imageId]);

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
        className="w-200 flex justify-center mx-auto mt-4"
        style={{ borderRadius: "4rem" }}
        alt="flower"
        src="url"
      />
      <div className="flex justify-center mt-4 font-bold text-2xl">
        {flowerInfo.name}
      </div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        꽃말
        <div className="mt-1 font-normal p-2">{flowerInfo.meaning}</div>
      </div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        물주기
        <div className="mt-1 font-normal p-2">{flowerInfo.water}</div>
      </div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        일조량
        <div className="mt-1 font-normal p-2">{flowerInfo.sunlight}</div>
      </div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        주의 사항
        <div className="mt-1 font-normal p-2">{flowerInfo.caution}</div>
      </div>
    </div>
  );
};
export default Result;
