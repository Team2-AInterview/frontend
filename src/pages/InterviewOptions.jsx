import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronLeft } from "react-icons/fa";
import View from "../img/Video Chat.png"
import Voice from "../img/Voice.png"
import One from "../img/Multiple Messages.png"
import Three from "../img/People Working Together.png"
import Question from "../img/Question.svg"
import axios from 'axios';

const Container = styled.div`
  width: 391px;
  min-height: 100vh;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  position: relative;
`

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  width: 100%;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 600;
`
const SubTitle = styled.div`
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.64px;
  padding-top: 5px;
`

const OptionTitle = styled.div`
  width: 318px;
  color: #3A00F9;
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 700;
  padding-top: 30px;
  text-align: center;
  position: relative;

`
const QuestionIcon = styled.div`
  width: 20px;
  height: 21px;
  color: #3A00F9;
  position: absolute;
  right: 0;
  top: 50%;
`;

const Tooltip = styled.div`
  visibility: hidden;
  width: 240px;
  background-color: rgba(217, 217, 217, 0.9);
  color: black;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 400;
  opacity: 0;
  transition: opacity 0.3s;

  ${QuestionIcon}:hover + & {  
    visibility: visible;
    opacity: 1;
  }
`
const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding-top: 10px;
`
const OptionBox = styled.div`
  width: 135px;
  height: 88px;
  border-radius: 10px;
  border: 1px solid ${props => props.selected ? '#3A00F9' : '#000'};
  background: ${props => props.selected ? '#F8F7FF' : 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #3A00F9;
    background: #F8F7FF;
  }

  ${props => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      border-color: #000;
      background: white;
    }
  `}

  .img {
    width: 45px;
    height: 45px;
  }
`

const Caution = styled.div`
  color: #596259;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-weight: 400;
  padding-top: 18px;
`
const Ready = styled.div`
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 700;
  padding-top: 80px;
`
const NextBtn = styled.button`
  width: 324px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: #3A00F9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #FFF;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background: ${props => props.disabled ? '#3A00F9' : '#2900b3'};
  }
`

const InterviewOptions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [interviewType, setInterviewType] = useState('');
    const [selectedMode, setSelectedMode] = useState(null); 
    const [selectedCount, setSelectedCount] = useState(null); 

    useEffect(() => {
        if (location.state?.interviewType) {
            setInterviewType(location.state.interviewType);
        }
    }, [location]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
    };

    const handleCountSelect = (count) => {
        if (interviewType === 'technical' && count === '3:1') {
            return;
        }
        setSelectedCount(count);
    };

    const handleNext = async () => {
        if (!selectedMode || !selectedCount) return;

        let mappedType;
        switch(interviewType) {
            case 'personality':
                mappedType = 'common';
                break;
            case 'technical':
                mappedType = 'technical';
                break;
            case 'both':
                mappedType = 'integrated';
                break;
            default:
                mappedType = 'common';
        }
    
        const interviewData = {
            url: `${process.env.REACT_APP_SERVER}/api/interview`,
            type: mappedType,
            isCameraOn: selectedMode === '화상',
            isManyToOne: selectedCount === '3:1'
        };
    
        try {
            const token = localStorage.getItem('authorization');
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER}/api/interview`,
                interviewData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Response data:', response.data);
            const path = selectedMode === '화상' 
                ? (selectedCount === '3:1' ? '/group-video' : '/video')
                : '/audio';
    
            navigate(path, {
                state: {
                    ...location.state,
                    interviewMode: selectedMode,
                    interviewCount: selectedCount,
                    interviewSetupData: response.data,
                    interviewId: response.data.interviewId,
                }
            });
    
        } catch (error) {
            console.error("Interview setup error:", error);
            if (error.response) {
                alert(`면접 설정 실패: ${error.response.data.message || '서버 오류가 발생했습니다.'}`);
            } else if (error.request) {
                alert('서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.');
            } else {
                alert('면접 설정 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={handleBackClick}>
                    <FaChevronLeft />
                </BackButton>
                <Title>면접 옵션 선택</Title>
            </Header>
            <Contents>
                <Title>면접 진행을 위한 옵션을 선택해주세요!</Title>
                <SubTitle>옵션 선택이 완료되면 바로 면접이 진행됩니다!</SubTitle>
                <OptionTitle>
                    [화상/음성 옵션 선택]
                    <QuestionIcon><img src={Question} alt="Question" /></QuestionIcon>
                    <Tooltip>
                        [유의사항]<br/>
                        면접 진행을 위해 사용 기기에<br/>
                        음성 기능 확인이 필요합니다.<br/>
                        화상 면접의 경우, 카메라 기능도<br/>
                        확인해주시기 바랍니다.<br/><br/>
                        해당 기능이 작동하지 않을 시, <br/>
                        면접이 제대로 진행되지 않는 점<br/>
                        유의해주시기 바랍니다.
                    </Tooltip>
                </OptionTitle>
                <OptionContainer>
                    <OptionBox 
                        selected={selectedMode === '화상'}
                        onClick={() => handleModeSelect('화상')}
                    >
                        <img src={View} alt="View" />화상 면접
                    </OptionBox>
                    <OptionBox 
                        selected={selectedMode === '음성'}
                        onClick={() => handleModeSelect('음성')}
                    >
                        <img src={Voice} alt="Voice" />음성 면접
                    </OptionBox>
                </OptionContainer>
                <OptionTitle>[면접 인원수 선택]</OptionTitle>
                <OptionContainer>
                    <OptionBox 
                        selected={selectedCount === '1:1'}
                        onClick={() => handleCountSelect('1:1')}
                    >
                        <img src={One} alt="One" />1:1 면접
                    </OptionBox>
                    <OptionBox 
                        selected={selectedCount === '3:1'}
                        onClick={() => handleCountSelect('3:1')}
                        disabled={interviewType === 'technical'}
                    >
                        <img src={Three} alt="Three" />3:1 면접
                    </OptionBox>
                </OptionContainer>
                <Caution>
                    *기술 면접의 경우 1:1면접만 가능합니다.<br/>
                    이 점 유의해주시기 바랍니다.
                </Caution>
                <Ready>
                    전부 준비되셨나요?<br/>
                    그럼 바로 면접장으로 입장하세요!
                </Ready>
                <NextBtn 
                    onClick={handleNext}
                    disabled={!selectedMode || !selectedCount}
                >
                    면접 진행하기
                </NextBtn>
            </Contents>
        </Container>
    );
};

export default InterviewOptions;