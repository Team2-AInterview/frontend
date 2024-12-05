import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApplicationList from "../components/mypage/ApplicationList";

const Container = styled.div`
  width: 391px;
  min-height: 100vh;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const StyledIcon = styled(Icon)`
  width: 55px;
  height: 55px;
  color: white;
`;

const Title = styled.div`
  /* margin-left: 22px; */
  margin-top: 82px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  /* text-align: left; */
  color: #000000;
`;

const Profilediv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 66px;
  /* margin-left: 22px; */
  margin-top: 28px;
  background: #3a00f9;
  border-radius: 100px;
`;

const Profile = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  margin-left: 41px;
  margin-top: 28px;
`;

const Box1div = styled.div`
  width: 330px;
  height: 122px;
  margin-bottom: 45px;
`;

//개인정보
const Box1 = styled.div`
  box-sizing: border-box;
  width: auto;
  height: 93px;
  /* margin-left: 25px; */
  margin-top: 60px;
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative;
`;
const Fixed = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  position: absolute;
`;
const Changes = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  position: absolute;
  flex-direction: row;
`;
const Modi = styled.div`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #cac9c9;
  margin-top: 7.5px;
  text-align: right;
`;
//이력서
const Box2 = styled.div`
  box-sizing: border-box;
  width: 330px;
  height: 64px;
  margin-top: 45px;
  /* margin-left: 25px; */
  /* margin-right: 25px; */
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative;
`;
const Modi2 = styled.button`
  margin-left: 240px;
  margin-top: 21px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  background-color: #3a00f9;
  border-radius: 30px;
  color: white;
  border: none;
  width: 68px;
  height: 23px;
  padding: 3px 6px;
  white-space: nowrap;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//아카이브
const Maindiv = styled.div`
  box-sizing: border-box;
  width: 330px;
  height: 785px;
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative;
  /* margin-left: 25px; */
  margin-top: 75px;
  /* margin-bottom: 100px; */
`;

const Title_4 = styled.div`
  position: absolute;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  margin-top: 19px;
  margin-left: 18px;
`;

const Subtitle = styled.div`
  position: absolute;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.06em;
  color: #000000;
  margin-top: 83px;
  margin-left: 18px;
`;

const Box4div = styled.div`
  position: relative;
`;

const Box4_1 = styled.div`
  position: absolute;
  background-color: #d9d9d9;
  width: 295px;
  height: 165px;
  margin-left: 16px;
  margin-top: 182px;
  border-radius: 10px;
`;

const Fixed4_1 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  position: absolute;
  margin-left: 25px;
  margin-top: 41px;
`;

const Changes4_1 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  position: absolute;
  margin-left: 25px;
  margin-top: 93px;
`;

const Box4_2 = styled.div`
  position: absolute;
  background-color: #d9d9d9;
  width: 295px;
  height: 165px;
  margin-left: 16px;
  margin-top: 386px;
  border-radius: 10px;
`;

const Fixed4_2 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  position: absolute;
  margin-left: 25px;
  margin-top: 41px;
`;

const Changes4_2 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  position: absolute;
  margin-left: 25px;
  margin-top: 93px;
`;

const Box4_3 = styled.div`
  position: absolute;
  background-color: #d9d9d9;
  width: 295px;
  height: 165px;
  margin-left: 16px;
  margin-top: 591px;
  border-radius: 10px;
`;

const Fixed4_3 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  position: absolute;
  margin-left: 25px;
  margin-top: 41px;
`;

const Changes4_3 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  position: absolute;
  margin-left: 25px;
  margin-top: 93px;
`;

const Mypage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState({ name: "", id: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setUser(response.data); // 사용자 정보 저장
        } else {
          console.error("사용자 정보를 가져오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("사용자 정보 조회 오류:", err);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [accessToken]);
  const handleEditClick = () => {
    navigate("/mypage/profile-edit");
  };

  const handleUploadResume = () => {
    navigate("/mypage/resume");
  };

  const handleBoxClick = () => {
    navigate("/mypage/archive");
  };

  // if (isLoading) {
  //   return <div>로딩 중...</div>; // 로딩 상태 표시
  // }

  return (
    <>
      <Container>
        <Title>마이페이지</Title>
        <Profilediv>
          <ProfileIcon>
            <StyledIcon icon="ic:baseline-person" />
          </ProfileIcon>
          <Profile>
            안녕하세요. 00님.
            <br />
            Ainterview에 오신것을 <br />
            환영합니다.
          </Profile>
        </Profilediv>
        <Box1div>
          <Box1>
            <Fixed style={{ marginTop: "19px", marginLeft: "30px" }}>
              이름
            </Fixed>
            <Changes style={{ marginTop: "19px", marginLeft: "124px" }}>
              {user.name || "로딩 중..."}
            </Changes>
            <Fixed style={{ marginTop: "49px", marginLeft: "30px" }}>
              아이디
            </Fixed>
            <Changes style={{ marginTop: "49px", marginLeft: "124px" }}>
              {user.id || "로딩 중..."}
            </Changes>
          </Box1>
          <Modi onClick={handleEditClick}>개인정보수정</Modi>
        </Box1div>
        <Box2>
          <Fixed style={{ marginTop: "21px", marginLeft: "20px" }}>
            나의 이력서
          </Fixed>
          <Changes
            style={{ marginTop: "21px", marginLeft: "122px" }}
            onClick={() => navigate("/mypage/resume/detail")}
          >
            대표이력서
          </Changes>
          <Modi2 onClick={handleUploadResume}>업로드하기</Modi2>
        </Box2>
        <ApplicationList accessToken={accessToken} />{" "}
        <Maindiv>
          <Title_4>면접 아카이브</Title_4>
          <Subtitle>
            진행된 면접 현황이 없습니다. <br />
            지금 바로 모의 면접을 진행해보세요!
          </Subtitle>
          <Box4div>
            <Box4_1 onClick={handleBoxClick}>
              <Fixed4_1>모의 면접 1</Fixed4_1>
              <Changes4_1>2024.04.24. 생성</Changes4_1>
            </Box4_1>
            <Box4_2 onClick={handleBoxClick}>
              <Fixed4_2>모의 면접 2</Fixed4_2>
              <Changes4_2>2024.04.25. 생성</Changes4_2>
            </Box4_2>
            <Box4_3 onClick={handleBoxClick}>
              <Fixed4_3>모의 면접 3</Fixed4_3>
              <Changes4_3>2024.04.26. 생성</Changes4_3>
            </Box4_3>
          </Box4div>
        </Maindiv>
      </Container>
    </>
  );
};

export default Mypage;
