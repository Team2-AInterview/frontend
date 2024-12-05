// scr/pages/InterviewQuestion.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 391px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 80px;
  background-color: white;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
  text-align: center;
`;
const SelectWrapper = styled.div`
  width: 100%;
  max-width: 300px;
    display: flex;
      justify-content: space-between;
      align-items: center;
`
const ResumeSelector = styled.div`
  width: 100%;
  margin-right: 10px;
  margin-bottom: 20px;

  select {
    width: 100%;
    padding: 10px;
    font-size: 0.7rem;
    border: 1px solid #ccc;
    border-radius: 30px;
  }
`;

const QuestionButton = styled.button`
  width: 110px;
  height: 25px;
  font-size: 0.6rem;
  background-color: #3A00F9;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #2A00D9;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #3A00F9;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #2A00D9;
  }
`;

const QuestionsBox = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;

  p {
    font-size: 1rem;
    color: black;
    margin: 5px 0;
  }

  .no-questions {
    text-align: center;

    p {
      font-size: 1rem;
      color: #888;
    }

    button {
      margin-top: 10px;
    }
  }
`;

const PreviousQuestions = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 20px;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: black;
    margin: 5px 0;
  }
`;

const InterviewQuestion = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const mockMyResumes = ["회사 지원서1", "기업 지원서2", "자기소개서3"];

    // 면접 예상 질문 목데이터
  const mockInterviewQuestions = [
    // 1. 자기소개 및 기본 질문
    "이력서에 적힌 내용을 바탕으로 본인을 간단히 소개해 주세요.",
    "개발자가 되기로 결심한 계기는 무엇인가요?",
    "본인의 강점과 약점은 무엇이며, 개발자로서 어떻게 보완했나요?",
    "이 직무에 지원한 이유는 무엇인가요?",
    // 2. 기술 스택 및 프로젝트 관련
    "이력서에 작성한 프로젝트 중 가장 도전적이었던 경험은 무엇인가요?",
    "해당 프로젝트에서 본인이 맡은 역할과 기여도를 구체적으로 설명해 주세요.",
    "사용했던 기술 스택(프로그래밍 언어, 프레임워크, 도구) 중 가장 자신 있는 것은 무엇인가요?",
    "특정 기술(React, Node.js, Python 등)을 선택한 이유는 무엇이었나요?",
    "협업 환경에서의 Git 사용 경험이나 Git 충돌 해결 사례를 설명해 주세요.",
    // 3. 문제 해결 및 디버깅 경험
    "개발 중 발생했던 주요 문제와 이를 해결한 방법을 이야기해 주세요.",
    "디버깅 과정에서 가장 어려웠던 사례는 무엇이었나요?",
    "오류 로그를 확인하고 문제를 해결했던 경험을 말해 주세요.",
    "제한된 시간 내에 문제를 해결해야 했던 경험이 있다면 공유해 주세요.",

  ];

  const handleResumeSelect = (resume) => {
    setSelectedResume(resume);
  };

  const handleGenerateQuestions = () => {
    if (!selectedResume) {
      alert("지원서를 먼저 선택해주세요!");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      // 모든 목데이터 질문 추가
      setGeneratedQuestions(mockInterviewQuestions);
      setIsGenerating(false);
    }, 2000);
  };

  const handleMockInterview = () => {
    navigate("/interview");
  };

  return (
    <div>
      <Container>
        <Title>면접 예상 질문</Title>
        <SelectWrapper>
        <ResumeSelector>
          <select
            onChange={(e) => handleResumeSelect(e.target.value)}
            value={selectedResume || ""}
          >
            <option value="" disabled>
              지원서를 선택하세요
            </option>
            {mockMyResumes.map((resume, index) => (
              <option key={index} value={resume}>
                {resume}
              </option>
            ))}
          </select>
        </ResumeSelector>
        <QuestionButton onClick={handleGenerateQuestions} disabled={isGenerating}>
          질문 생성하기
        </QuestionButton>
        </SelectWrapper>
        <QuestionsBox>
          {isGenerating ? (
            <p>질문 생성 중...</p>
          ) : generatedQuestions.length > 0 ? (
            <div>
              {generatedQuestions.map((question, index) => (
                <p key={index}>• {question}</p>
              ))}
            </div>
          ) : (
            <div className="no-questions">
              <p>진행된 면접 현황이 없습니다.</p>
              <Button onClick={handleMockInterview}>면접 진행하기</Button>
            </div>
          )}
        </QuestionsBox>
        <PreviousQuestions>
          <h2>이전 질문</h2>
          {generatedQuestions.map((question, index) => (
            <p key={index}>• {question}</p>
          ))}
        </PreviousQuestions>
      </Container>
    </div>
  );
};

export default InterviewQuestion;
