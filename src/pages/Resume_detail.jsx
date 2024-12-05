import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Box2 from "../components/mypage/ResumeInput";
import Box3 from "../components/mypage/ResumeInput";
import Box4 from "../components/mypage/ResumeInput";
import Box5 from "../components/mypage/ResumeInput";
import axios from "axios";
import img from "../img/Camera.png";

const Container = styled.div`
  width: 391px;
  min-height: 100vh;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-top: 88px;
  margin-bottom: 7px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  text-align: center;
`;
const Titles = styled.input`
  font-size: 20px;
  color: #000000;
  text-align: center;
  border: none;
  outline: none;
  width: 340px;
  border-radius: 10px;
  &:focus {
    border: 1px solid;
    border-color: #3a00f9; /* 포커스 시 보라색 */
  }
`;
const Maindiv = styled.div`
  box-sizing: border-box;
  width: 340px;
  height: 605px;
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative;
  margin-left: 25px;
  margin-right: 25px;
`;

const Subtitle = styled.div`
  position: absolute;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #000000;
`;

const Box1 = styled.div`
  position: absolute;
  background-color: #d9d9d9;
  width: 75px;
  height: 100px;
  margin-left: 14px;
  margin-top: 65px;
  border-radius: 10px;
`;

const MDdiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Modi1 = styled.button`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  background-color: #d9d9d9;
  border-radius: 30px;
  color: #3a00f9;
  border: none;
  width: 70px;
  height: 22px;
  white-space: nowrap;
  text-align: center;
  margin-top: 16px;
  margin-left: 190px;
`;

const Modi2 = styled.button`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  background-color: #3a00f9;
  border-radius: 30px;
  color: white;
  border: none;
  width: 70px;
  height: 22px;
  white-space: nowrap;
  text-align: center;
  margin-top: 16px;
  margin-left: 33px;
  margin-bottom: 80px;
  flex-direction: row;
`;

const ResumeDetail = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(""); // 이름 상태 추가
  const [academicAbility, setAcademicAbility] = useState("");
  const [career, setCareer] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumeData = async () => {
      const accessToken = localStorage.getItem("authorization");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const url = `${process.env.REACT_APP_SERVER}/api/user/resume/get`; // GET 요청

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setName(data.name || "");
          setAcademicAbility(data.academicAbility || "");
          setCareer(data.career || "");
          setContact(data.contact || "");
          setImage(data.profileImage || null);
        } else {
          alert("이력서를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
        alert("이력서를 불러오는 데 오류가 발생했습니다.");
      }
    };

    fetchResumeData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleBoxClick = () => {
    navigate("/mypage");
  };

  return (
    <Container>
      <Title>대표이력서</Title>
      <Maindiv>
        <Subtitle style={{ margin: "40px 150px 9px 111px" }}>프로필</Subtitle>
        <Box1>
          {image ? (
            <img
              src={image}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          ) : (
            <img
              src={img}
              alt="camera"
              style={{
                width: "30px",
                height: "30px",
                objectFit: "cover",
                position: "absolute",
                marginTop: 33,
                marginLeft: 22,
              }}
            />
          )}
        </Box1>
        <Box2
          type="text"
          placeholder="프로필을 작성해주세요."
          value={name}
          readOnly
        />
        <Subtitle style={{ marginTop: "175px", marginLeft: "14px" }}>
          학력
        </Subtitle>
        <Box3
          type="text"
          placeholder="학력을 작성해주세요."
          value={academicAbility}
          readOnly
        />
        <Subtitle style={{ marginTop: "314px", marginLeft: "14px" }}>
          경력
        </Subtitle>
        <Box4
          type="text"
          value={career}
          placeholder="경력을 작성해주세요."
          readOnly
        />
        <Subtitle style={{ marginTop: "468px", marginLeft: "14px" }}>
          연락처
        </Subtitle>
        <Box5
          type="text"
          value={contact}
          placeholder="연락처를 작성해주세요."
          readOnly
        />
      </Maindiv>

      <MDdiv>
        <Modi1 onClick={handleBoxClick}>목록으로</Modi1>
      </MDdiv>
    </Container>
  );
};

export default ResumeDetail;
