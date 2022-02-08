import React from 'react';
import styled from 'styled-components';

const Logo = styled.div`
    background-image: url('../public/images/Logo.png');
`;

const Header = () => {
    return(
        <nav style={{width:"100wv"}} class="navbar navbar-expand-lg navbar-light bg-light">
            <b><a class="navbar-brand" href="#" style={{color:"#dd6d22"}}>F-lower</a></b>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a class="nav-item nav-link active" href="#">홈 <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="#">꽃 찾기</a>
                <a class="nav-item nav-link" href="#">내 꽃은</a>
                <a class="nav-item nav-link disabled" href="#">캘린더</a>
                </div>
            </div>
        </nav>
    );
};

export default Header;