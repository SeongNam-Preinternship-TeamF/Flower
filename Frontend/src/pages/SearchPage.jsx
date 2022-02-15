import React, { useState, useEffect } from "react";
import History from "../components/history.js";
import SearchBar from "../components/search-bar.js";
import "../css/Result.css";
<css></css>;

function SearchPage() {
  //string은 map을 사용 할 수 없기때문에 object 형태로 변환 시키기 위해 parsing을 해줘야함
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem("keywords") || "[]")
  );

  //keyword에 변화가 일어날때만 랜더링
  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  //state를 다루는 함수는 handle 보통 많이 붙인다.

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

  //자식 컴포넌트에서 setState를 못하기때문에 그거를 바꿔주는 함수를 선언후 그 함수를 넘겨야함
  return (
    <div className="relative">
      <div className="backimage bg-cover ">
        <div className="pt-96">
          <SearchBar onAddKeyword={handleAddKeyword}></SearchBar>
          <History
            keywords={keywords}
            onClearKeywords={handleClearKeywords}
            onRemoveKeyword={handleRemoveKeyword}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
