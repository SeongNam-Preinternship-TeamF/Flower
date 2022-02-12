import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/Result.css";

const Result = () => {
  return (
    <div className="w-full">
      <p
        className="w-full flex justify-center font-bold mt-4 text-4xl"
        style={{ letterSpacing: "1em" }}
      >
        앞으로{" "}
        <span style={{ letterSpacing: "1em", color: "#E37B7B" }}>꽃길</span>만
        걷자
      </p>
      <img
        className="w-200 flex justify-center mx-auto mt-4"
        style={{ borderRadius: "4rem" }}
        alt="flower"
        src="url"
      />
      <div className="flex justify-center mt-4 font-bold text-2xl">꽃 이름</div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        꽃말
        <div className="mt-1 font-normal p-2">
          해바라기 꽃말은 나라마다 조금씩 차이가 있습니다. 서양에서는 예로부터
          태양만 바라보고 있다하여, 애모, 숭배를 뜻해왔으며, "당신만을
          사랑합니다" 라는 의미로도 해석이 됩니다.동양에서는 생명과 행운의
          상징으로 해석하고 있습니다.
        </div>
      </div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        물주기
        <div className="mt-1 font-normal p-2">
          다른 식물에 비해 해바라기에 물을 더 여러 번 주어야 한다. 1-2일에 한
          번씩 흙의 촉촉한 정도를 확인해준다. 일반적으로 일주일에 2.5 cm 정도의
          물을 주면 된다.
        </div>
      </div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        일조량
        <div className="mt-1 font-normal p-2">
          빛을 좋아하는 것은 해바라기 특징입니다. 해바라기는 해가 잘드는 장소에
          두고, 창가나 최대한 빛이 충분한 곳에서 관리하면서 해빛을 충분히 쪼여
          줍니다.
        </div>
      </div>
      <div className="mx-16 h-24 w-11/12 shadow-lg rounded-2xl justify-center mt-4 font-bold text-center">
        주의 사항
        <div className="mt-1 font-normal p-2">
          해바라기는 수국처럼 물이 부족한 것에 아주 민감하게 반응합니다. 화분의
          흙이 말라 있다면 충분한 물을 급수합니다.또한, 해바라기 잎과 줄기에
          이물질이 묻어 있다면 흐르는 물로 씻어줍니다.
        </div>
      </div>
    </div>
  );
};
export default Result;
