import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Result.css";
import SearchBox from "./SearchBox";

const SearchResult = () => {
  const { searchId } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [flowerInfo, setFlowerInfo] = useState({
    id: "",
    name: "",
    imgURL: "",
  });

  const onSubmit = (img) => {
    axios
      .get(`http://localhost:5001/api/v1/search?id=${img}`)
      .then((response) => {
        console.log(response);
        setFlowerInfo(response.data);
        alert("이미지 로딩 완료");
      })
      .catch((error) => {
        alert("이미지 로딩 실패");
      });
  };

  useEffect(() => {
    onSubmit(searchId);
  }, [searchId]);

  return (
    <div className="w-full">
      <input
        className="border-2 border-yellow-600 rounded-2xl flex mx-auto mt-16 w-96 h-9 pl-2"
        style={{ boarderColor: "#dd6d22" }}
        type="text"
        value={searchValue}
        placeholder="'꽃이름' 또는 '꽃말'"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="flex flex-wrap justify-center">
        <SearchBox title={flowerInfo.name} content={flowerInfo.imgURL} />
        <SearchBox title={flowerInfo.name} content={flowerInfo.imgURL} />
        <SearchBox title={flowerInfo.name} content={flowerInfo.imgURL} />
        <SearchBox title={flowerInfo.name} content={flowerInfo.imgURL} />
        <SearchBox title={flowerInfo.name} content={flowerInfo.imgURL} />
      </div>
    </div>
  );
};
export default SearchResult;
