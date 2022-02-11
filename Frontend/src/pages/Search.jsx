import React, { useState } from "react";
import "../css/Search.css";
//import axios from "axios";
//import Loading from "../components/Loading";
//import { useNavigate } from "react-router-dom";

const Search = (props) => {
  const products = props.searchItems;
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const shouldDisplayButton = searchValue.length > 0;
  const handleInputClear = () => {
    setSearchValue("");
  };

  return (
    <div className="w-full h-full">
      <div className="background mx-auto">
        <div className="searchbar w-full mt-30 flex justify-center">
          <input
            type="text"
            value={searchValue}
            placeholder="'꽃이름' 또는 '꽃말'"
            onChange={handleInputChange}
          />
          <button onClick={handleInputClear}>clear</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
