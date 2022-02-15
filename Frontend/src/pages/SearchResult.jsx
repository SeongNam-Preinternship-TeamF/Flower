import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Result.css";
import SearchBox from "./SearchBox";
import History from "../components/history.js";
import SearchBar from "../components/search-bar.js";
import { useNavigate } from "react-router-dom";

const SearchResult = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("장미");
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
  const [searchInfo, setSearchInfo] = useState([]);

  useEffect(() => {
    searchId && onSubmit(searchId);
  }, []);

  const onSubmit = (text) => {
    axios
      .get(`http://localhost:5001/api/v1/search?text=${text}`)
      .then((response) => {
        console.log(response);
        setSearchInfo(response.data.idList);
      })
      .catch((error) => {});
  };

  return (
    <div className="w-full">
      <SearchBar calssName="" onAddKeyword={handleAddKeyword}></SearchBar>
      <History
        keywords={keywords}
        onClearKeywords={handleClearKeywords}
        onRemoveKeyword={handleRemoveKeyword}
      />
      <div className="flex flex-wrap justify-center">
        {searchInfo.map((name, imgURL, id, index) => (
          <SearchBox
            key={index}
            content={imgURL}
            title={name}
            onClick={() => navigate(`/detail/${id}`)}
          />
        ))}
        <SearchBox
          content={searchInfo.imgURL}
          title={searchInfo.name}
          onClick={() => navigate(`/detail/${id}`)}
        />
        <SearchBox
          content={searchInfo.imgURL}
          title={searchInfo.name}
          onClick={() => navigate(`/detail/${id}`)}
        />
        <SearchBox
          content={searchInfo.imgURL}
          title={searchInfo.name}
          onClick={() => navigate(`/detail/${id}`)}
        />
        <SearchBox
          content={searchInfo.imgURL}
          title={searchInfo.name}
          onClick={() => navigate(`/detail/${id}`)}
        />
      </div>
    </div>
  );
};
export default SearchResult;
