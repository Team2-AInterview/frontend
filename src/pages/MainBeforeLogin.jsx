import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png"



const MainBeforeLogin = () => {
    const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

    return (
        <Container>
            <TopSection>
                <Logo src= {logo} alt="Logo" />
                <Title>성공적인 면접을 위해 AI와 함께</Title>
                <Subtitle>미리 면접을 준비해보세요!</Subtitle>
            </TopSection>
            <BottomSection>
                <StartButton onClick={() => handleNavigation('/intro')}>시작하기</StartButton>
                <Links>
                <LinkText onClick={() => handleNavigation('/login')}>로그인</LinkText>
                <span>|</span>
                <LinkText onClick={() => handleNavigation('/signup')}>회원가입</LinkText>
                </Links>
            </BottomSection>
        </Container>
    );
};

export default MainBeforeLogin;

const Container = styled.div`
  display: flex;
  width: 391px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 40px 0;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px ;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 130px;
`;

const Logo = styled.img`
  width: 150px;
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
  margin-bottom: 40px;
`;

const StartButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #3A00F9;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 20px;

  &:hover {
    background-color: #2A00D9;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
  color: #333;
`;

const LinkText = styled.span`
  color: #333;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;