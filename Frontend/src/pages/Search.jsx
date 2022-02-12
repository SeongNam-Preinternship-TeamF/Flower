import React, { useState, useEffect } from "react";
import "../css/Search.css";
import { useParams } from "react-router-dom";
import axios from "axios";
//import Loading from "../components/Loading";
//import { useNavigate } from "react-router-dom";

const Search = (props) => {
  const products = props.searchItems;
  const [searchValue, setSearchValue] = useState("");
  const { imageId } = useParams();
  const [id, setId] = useState("");
  const [search, setSearch] = useState({
    id: "",
  });

  //const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const shouldDisplayButton = searchValue.length > 0;

  const onSubmit = (text) => {
    axios
      .get(`http://localhost:5001/api/v1/seaerch?q=${text}`)
      .then((response) => {
        console.log(response);
        setSearch(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    onSubmit(imageId);
  }, [imageId]);

  return (
    <div className="w-full h-full">
      <div className="background mx-auto">
        <div className="searchbar w-full mt-30 flex justify-center">
          <input
            className="border-2 border-yellow-600 rounded-3xl flex mx-auto mt-96 w-96 h-12 pl-2"
            type="text"
            value={searchValue}
            placeholder="'꽃이름' 또는 '꽃말'"
            onChange={handleInputChange}
          />
          {/* <button
            className="font-bold cursor-pointer"
            style={{ color: "#dd6d22" }}
            onClick={() => navigate(`/searchresult/${id}`)}
          > */}
          <button>검색</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
