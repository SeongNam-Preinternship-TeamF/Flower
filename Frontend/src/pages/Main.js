import React, { useState, useEffect } from "react";
import "../css/Main.css";
import axios from "axios";
import Loading from "../components/Loading";
import { Route, Routes, Link } from "react-router-dom";

const Main = (props) => {
  const [img, setImg] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [filename, setFilename] = useState(null);
  const [taskID, setTaskID] = useState(1);
  const [isLoading, setIsLoading] = useState(false); 
  
  const buttonRef = React.useRef()

  const handleUploadButtonClick = () => {
    buttonRef.current?.click();
  };
  
  const uploadImg = (e) => {
    const currentFile = e.target.files[0];
    setImg(currentFile);
  };

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", img);
    console.log(img);
    setFilename(img.name);
    axios
      .post("url ", formData)
      .then((response) => {
        console.log(response.data);
        props.onSubmit(response.data.url, response.data.result);
        setIsLoading(false);
        alert("이미지 로딩 완료");
      })

      .catch((error) => {
        alert("이미지 로딩 실패");
      });
  };

  return (
    <div className="margin">
      <div className="banner"></div>
      <div className="subtitle"> 자신의 꽃 사진을 업로드 해주세요.</div>
      {img == null ? <p></p> : <img src={fileUrl} />}
      <label
        for="profile-upload"
        className="selectPic"
        onClick={handleUploadButtonClick}
        type="submit" 
      >
        사진 선택
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={uploadImg}
        ref={buttonRef}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <button onclick={onSubmit} className="result">
          결과 보기
        </button>
      )}
    </div>
  );
};

export default Main;
