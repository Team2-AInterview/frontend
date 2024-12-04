import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../components/PageLayout';
import { Header } from '../components/Header';
import QuestionIcon from "../img/hugeicons_question.png"
import Technical from "../img/Development Skill.png"
import Common from "../img/Management.png"
import Intergrated from "../img/Workspace.png"

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Question = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 600;
  margin: 30px 0px;
  img {
    width: 45px;
    height: 45px;
    margin-right: 8px;
  }
`

const OptionTitle = styled.div`
  color: #3A00F9;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 18px;
  font-weight: 700;
  margin: 20px 0;
`

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OptionContainer = styled.div`
  width: 297px;
  height: 417px;
  border-radius: 13px;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const Option = styled.div`
  width: 230px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  img {
    width: 45px;
    height: 45px;
  }
`

const OptionText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: rgba(0, 0, 0, 0.50);
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-weight: 500;
`

const InterviewButton = styled.button`
  width: 158px;
  height: 33px;
  border-radius: 30px;
  background: #3A00F9;
  color: #FFF;
  border: none;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #2900b3;
  }
`


const InterviewOption = ({ image, alt, description, buttonText, onSelect }) => (
  <Option>
    <img src={image} alt={alt} />
    <OptionText>
      {description}
      <InterviewButton onClick={onSelect}>
        {buttonText}
      </InterviewButton>
    </OptionText>
  </Option>
);

const MockInterview = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/main');
    };

    const handleInterviewSelect = (type) => {
      navigate('/interview/options', {
          state: {
              interviewType: type  // personality, technical, both 중 하나
          }
      });
  };
  
    const interviewOptions = [
      {
          id: 'technical',
          image: Technical,
          alt: 'technical',
          description: '전문 지식과 기술 능력평가',
          buttonText: '기술 면접 진행하기',
          type: 'technical'  
      },
      {
          id: 'common',
          image: Common,
          alt: 'common',
          description: ['공통 질문을 통한 일관된 평가'],
          buttonText: '공통 면접 진행하기',
          type: 'personality'  
      },
      {
          id: 'integrated',
          image: Intergrated,
          alt: 'integrated',
          description: '기술 면접 + 공통 면접',
          buttonText: '통합 면접 진행하기',
          type: 'both'  
      }
  ];

    return (
      <Container>
        <Header title="모의 면접" onBackClick={handleBackClick}/>
        <QuestionContainer>
            <Question>
                <img src={QuestionIcon} alt="question_icon" />
                어떤 면접을<br/>
                진행하고 싶으신가요?
            </Question>
        </QuestionContainer>
        <Contents>
            <OptionTitle>[면접 형식 선택]</OptionTitle>
            <OptionContainer>
                {interviewOptions.map((option) => (
                    <InterviewOption
                        key={option.id}
                        image={option.image}
                        alt={option.alt}
                        description={option.description}
                        buttonText={option.buttonText}
                        onSelect={() => handleInterviewSelect(option.type)}
                    />
                ))}
            </OptionContainer>
        </Contents>
    </Container>
    );
};

export default MockInterview;