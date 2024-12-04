import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";

const Container = styled.div`
  display: flex;
  width: 391px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  padding-top: 100px;
  padding-bottom: 80px;
  overflow-y: auto; 
  box-sizing: border-box; /* padding 포함한 높이 계산 */
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  text-align: center;
  margin: 10px 0;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 30px; 
`;

const StartButton = styled.button`
  width: 145px;
  padding: 10px 20px;
  font-size: 0.7rem;
  color: #3A00F9;
  border: 1px solid #3A00F9;
  background: none;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 30px; 
  cursor: pointer;

  &:focus {
    background-color: #3A00F9;
    color: white;
  }

  &:hover {
    background-color: #3A00F9;
    color: white;
  }
`;

const ArchiveTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  color: black;
  text-align: left;
  width: 100%;
  max-width: 300px;
  margin: 40px 0 15px;
`;

const ArchiveContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  max-width: 300px;
  gap: 10px;
  padding-bottom: 10px;
`;

const ArchiveBox = styled.div`
  width: 150px;
  height: 100px;
  background-color: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: #bbb;
  }
`;
const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  color: black;
  text-align: center;
  width: 100%;
  max-width: 300px;
  margin: 40px 0 5px;
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: black;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px; 
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #3A00F9;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px; /* 버튼 간 간격 추가 */
  width: 200px;

  &:hover {
    background-color: #2A00D9;
  }
`;

const Main = () => {
  const navigate = useNavigate();

  const handleArchiveClick = () => {
    navigate("/mypage");
  };
  
  const interviewClick = () => {
    navigate("/interview");
  };

  const interviewQuestionClick = () => {
    navigate("/interviewquestion");
  };

  const resumeClick = () => {
    navigate("/mypage/resume");
  };

  const introductionClick = () => {
    navigate("/mypage/introduction");
  };

  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <Title>성공적인 면접을 위해 AI와 함께</Title>
      <Subtitle>미리 면접을 준비해보세요 !</Subtitle>
      <StartButton onClick={interviewClick}>면접 시작하기</StartButton>

      <ArchiveTitle>면접 아카이브</ArchiveTitle>
      <ArchiveContainer>
        <ArchiveBox onClick={handleArchiveClick}>모의 면접 1<br />2024. 04. 24 생성</ArchiveBox>
        <ArchiveBox onClick={handleArchiveClick}>모의 면접 2<br />2024. 04. 25 생성</ArchiveBox>
        <ArchiveBox onClick={handleArchiveClick}>모의 면접 3<br />2024. 04. 26 생성</ArchiveBox>
      </ArchiveContainer>

      <SectionTitle>예상 질문 받아보기</SectionTitle>
      <SectionSubtitle>이력서 및 지원서를 기반한 AI가 추천해주는 <br/> 면접 예상 질문을 받아보세요</SectionSubtitle>
      <ActionButton onClick={interviewQuestionClick}>면접 예상 질문</ActionButton>

      <SectionTitle>나의 정보 입력하기</SectionTitle>
      <SectionSubtitle>이력서 및 지원서를 입력하고 <br/> AI 면접에 참여해보세요</SectionSubtitle>
      <ActionButton onClick={resumeClick}>지원서 등록</ActionButton>
      <ActionButton onClick={introductionClick}>이력서 등록</ActionButton>
    </Container>
  );
};

export default Main;
