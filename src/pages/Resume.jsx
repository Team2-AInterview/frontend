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

const Resume = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(""); // 이름 상태 추가
  const [academicAbility, setAcademicAbility] = useState("");
  const [career, setCareer] = useState("");
  const [contact, setContact] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result); // 이미지 데이터 URL 저장
      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();

  const handleSave = async () => {
    // 콘솔에서 상태 값 확인
    console.log("Saving data:", { name, academicAbility, career, contact });

    const accessToken = localStorage.getItem("authorization");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const url = `${process.env.REACT_APP_SERVER}/api/user/resume/save`; // 서버 URL

    // 상태 값이 제대로 확인되었는지 다시 한번 콘솔로 확인
    console.log("Sending data to server:", {
      name,
      academicAbility,
      career,
      contact,
    });

    const requestData = {
      name,
      academicAbility,
      career,
      contact,
    };

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        alert("저장되었습니다!");
      } else {
        console.error("서버 응답 실패:", response);
        alert(`요청에 실패했습니다: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error", error.response || error);
      alert(
        `저장 중 오류 발생: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleInput = (e, field) => {
    const value = e.target.value;
    console.log(`Changing ${field} to: `, value); // 값이 제대로 넘어오는지 확인
    if (field === "name") {
      setName(value);
    } else if (field === "academicAbility") {
      setAcademicAbility(value);
    } else if (field === "career") {
      setCareer(value);
    } else if (field === "contact") {
      setContact(value);
    }
  };
  const handleBoxClick = () => {
    navigate("/mypage");
  };

  useEffect(() => {
    console.log("Updated states:", { name, academicAbility, career, contact });
  }, [name, academicAbility, career, contact]);
  return (
    <>
      <Container>
        <Title>대표이력서</Title>
        <Maindiv>
          <Subtitle style={{ margin: "40px 150px 9px 111px" }}>프로필</Subtitle>
          <Box1 onClick={() => document.getElementById("fileUpload").click()}>
            {" "}
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
            <label htmlFor="fileUpload"></label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
          </Box1>
          <Box2
            type="text"
            placeholder="프로필을 작성해주세요."
            handleInput={handleInput}
            value={name}
            onChange={(e) => setName(e, "name")}
          />
          <Subtitle style={{ marginTop: "175px", marginLeft: "14px" }}>
            학력
          </Subtitle>
          <Box3
            type="text"
            placeholder="학력을 작성해주세요."
            handleInput={handleInput}
            value={academicAbility}
            onChange={(e) => setAcademicAbility(e, "academicAbility")}
          />
          <Subtitle style={{ marginTop: "314px", marginLeft: "14px" }}>
            경력
          </Subtitle>
          <Box4
            type="text"
            value={career}
            placeholder="경력을 작성해주세요."
            handleInput={handleInput}
            onChange={(e) => setCareer(e, "career")}
          />
          <Subtitle style={{ marginTop: "468px", marginLeft: "14px" }}>
            contact
          </Subtitle>
          <Box5
            type="text"
            value={contact}
            placeholder="연락처를 작성해주세요."
            handleInput={handleInput}
            onChange={(e) => setContact(e, "contact")}
          />
        </Maindiv>

        <MDdiv>
          <Modi1 onClick={handleBoxClick}>목록으로</Modi1>
          <Modi2 onClick={handleSave}>저장하기</Modi2>
        </MDdiv>
      </Container>
    </>
  );
};

export default Resume;
