import React, { useState } from "react";
import "../css/Search.css";
//import axios from "axios";
//import Loading from "../components/Loading";
//import { useNavigate } from "react-router-dom";

// const Search = () => {
//   return (
//     <div className="w-full">
//       <div className="banner mx-4"></div>
//       <div className="mx-auto mt-10 mb-4 w-72 text-center text-base font-bold">
//         <h1>Searh</h1>
//       </div>
//     </div>
//   );
// };

export default function SearchBar({ onChange }) {
  return (
    <div className="w-full">
      <div className="banner mx-4"></div>
      <form className="search">
        <input
          type="text"
          placeholder="꽃을 검색해보세요."
          className="search_bar"
          name="searchText"
          onChange={onChange}
        />
      </form>
    </div>
  );
}
