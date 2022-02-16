import React, { useState, useEffect } from "react";
import "../css/Main.css";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [id, setId] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const navigate = useNavigate();

  const buttonRef = React.useRef();

  const handleUploadButtonClick = () => buttonRef.current?.click();

  const uploadImg = (e) => {
    e.preventDefault();
    const currentFile = e.target.files[0];
    setFileUrl(URL.createObjectURL(e.target.files[0]));
    onSubmit(currentFile);
  };

  const onSubmit = (img) => {
    setIsLoad(true);
    const formData = new FormData();
    formData.append("upload_files", img);
    setFilename(img.name);
    axios
      .post("http://localhost:5001/api/v1/upload", formData)
      .then((response) => {
        console.log(response);
        setId(response.data.id);
        setIsLoad(false);
      })
      .catch((error) => {
        console.log(formData);
        alert("이미지 로딩 실패");
      });
  };

  return (
    <div className="w-full">
      <div className="banner mx-4"></div>
      <div className="w-72 mx-auto font-bold mt-6 mb-2 text-base text-center">
        자신의 꽃 사진을 업로드 해주세요.
      </div>
      {fileUrl === "" ? (
        <p></p>
      ) : (
        <img className="w-32 mx-auto" src={fileUrl} alt="previewImage" />
      )}
      {isLoad ? <Loading /> : <button></button>}
      <div className="w-full flex justify-center mb-5">
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

        {id !== "" && (
          <button onClick={() => navigate(`/result/${id}`)} className="result">
            결과 보기
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
