import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Result from "./pages/Result";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/result/:imageId" element={<Result />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/searchresult/:searchId" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
