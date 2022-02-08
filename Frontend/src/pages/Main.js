import React, { useState, useEffect } from "react";
import "../css/Main.css";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
  const [img, setImg] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [filename, setFilename] = useState(null);
  const [taskID, setTaskID] = useState(1);

  const navigate = useNavigate();

  const buttonRef = React.useRef();

  const handleUploadButtonClick = () => {
    buttonRef.current?.click();
  };

  const uploadImg = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const currentFile = e.target.files[0];
    reader.onloadend = () => {
      setImg(currentFile);
      setFileUrl(reader.result.toString());
      console.log(reader.result.toString);
    };
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("file", img);
    console.log(img);
    setFilename(img.name);
    navigate("/result");
    axios
      .post("url ", formData)
      .then((response) => {
        console.log(response.data);
        props.onSubmit(response.data.url, response.data.result);
        alert("이미지 로딩 완료");
      })

      .catch((error) => {
        alert("이미지 로딩 실패");
      });
  };

  return (
    <div className="w-full">
      <div className="banner mx-4"></div>
      <div className="w-72 mx-auto font-bold my-12 text-base text-center">
        자신의 꽃 사진을 업로드 해주세요.
      </div>
      {img == null ? <p></p> : <img src={fileUrl} alt="mainImage" />}
      <div className="w-full flex justify-center">
        <div className="selectPic" onClick={handleUploadButtonClick}>
          사진 선택
        </div>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => uploadImg(e)}
          ref={buttonRef}
        />
        <button onClick={onSubmit} className="result">
          결과 보기
        </button>
      </div>
    </div>
  );
};

export default Main;
