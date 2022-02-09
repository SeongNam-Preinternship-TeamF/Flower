import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  background-image: url("../public/images/Logo.png");
`;

const Header = () => {
  return (
    <nav
      style={{ width: "100wv" }}
      className="navbar navbar-expand-lg navbar-light bg-light"
    >
      <b>
        <a className="navbar-brand" href="/" style={{ color: "#dd6d22" }}>
          F-lower
        </a>
      </b>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">
            홈 <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="#">
            꽃 찾기
          </a>
          <a className="nav-item nav-link" href="#">
            내 꽃은
          </a>
          <a className="nav-item nav-link disabled" href="#">
            캘린더
            {/* saf */}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
