import React from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

function Loading() {
  const Loading = styled.div`
    position: relative;
    margin-bottom: 1rem;
    justify-content: center;
    margin-top: 1rem;
  `;

  return (
    <Loading className="w-30 mx-auto flex">
      <TailSpin color="#FE5657" height={30} width={30} />
    </Loading>
  );
}

export default Loading;
