import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  overflow: hidden;
`;
const Title = styled.span`
  float: left;
  font-weight: 400;
  color: #a7a7a7;
`;
const RemoveText = styled.span`
  float: right;
  color: #a7a7a7;
`;

const ListContainer = styled.ul`
  margin: 10px 0;
`;

//&는 자기 자신을 나타냄
//즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const RemoveButton = styled.button`
  float: right;
  color: #dd6d22;
  border: 1.5px solid #dd6d22;
  padding: 3px 5px;
  margin-right: 2px;
  border-radius: 15px;
`;

const Keyword = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

function History({ keywords, onRemoveKeyword, onClearKeywords }) {
  console.log("keyword", keywords);
  if (keywords.length === 0) {
    return (
      <div className="mx-auto w-50 mt-2 text-gray-400">
        최근 검색된 기록이 없습니다.
      </div>
    );
  }

  return (
    <div className="w-50 mx-auto">
      <div>
        <HeaderContainer>
          <Title>최근 검색어</Title>
          <RemoveText onClick={onClearKeywords}>전체삭제</RemoveText>
        </HeaderContainer>
        <ListContainer>
          {keywords.map(({ id, text }) => {
            return (
              <KeywordContainer key={id}>
                <Keyword>{text}</Keyword>
                <RemoveButton
                  //눌렸을때 해야하는거라 arrow function을 사용하여 실행
                  //그냥 함수 쓰면은 그려지자마자 바로 실행됨
                  onClick={() => {
                    onRemoveKeyword(id);
                  }}
                >
                  삭제
                </RemoveButton>
              </KeywordContainer>
            );
          })}
        </ListContainer>
      </div>
    </div>
  );
}

export default History;
