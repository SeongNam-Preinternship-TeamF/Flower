import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Result.css";
import SearchBox from "./SearchBox";
import History from "../components/search/history.js";
import SearchBar from "../components/search/search-bar.js";

const SearchResult = () => {
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem("keywords") || "[]")
  );
  //검색어 추가
  const handleAddKeyword = (text) => {
    console.log("text", text);
    const newKeyword = {
      id: Date.now(),
      text: text,
    };
    setKeywords([newKeyword, ...keywords]);
  };

  //검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id !== id;
    });
    setKeywords(nextKeyword);
  };

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
  };

  const { searchId } = useParams();
  const [searchInfo, setSearchInfo] = useState({
    idList: [
      {
        id: "",
      },
      {
        id: "",
      },
      {
        id: "",
      },
      {
        id: "",
      },
      {
        id: "",
      },
    ],
  });

  const onSubmit = (text) => {
    axios
      .get(`http://localhost:5001/api/v1/search?id=${text}`)
      .then((response) => {
        console.log(response);
        setSearchInfo(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    onSubmit(searchId);
  }, [searchId]);

  return (
    <div className="w-full">
      <SearchBar calssName="" onAddKeyword={handleAddKeyword}></SearchBar>
      <History
        keywords={keywords}
        onClearKeywords={handleClearKeywords}
        onRemoveKeyword={handleRemoveKeyword}
      />
      <div className="flex flex-wrap justify-center">
        <SearchBox content={searchInfo.imgURL} title={searchInfo.id} />
        <SearchBox content={searchInfo.imgURL} title={searchInfo.id} />
        <SearchBox content={searchInfo.imgURL} title={searchInfo.id} />
        <SearchBox content={searchInfo.imgURL} title={searchInfo.id} />
        <SearchBox content={searchInfo.imgURL} title={searchInfo.id} />
      </div>
    </div>
  );
};
export default SearchResult;
