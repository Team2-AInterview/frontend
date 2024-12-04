import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Box1 from "../components/mypage/IntroInput";
import Box2 from "../components/mypage/IntroInput";
import Box3 from "../components/mypage/IntroInput";
import Box4 from "../components/mypage/IntroInput";
import IntroInput from "../components/mypage/IntroInput";
import { Plus } from "../img/svgs";
import axios from "axios";

const Title = styled.div`
  margin-top: 88px;
  margin-bottom: 10px;
  text-align: center;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
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
  height: 642px;
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
  margin-left: 15px;
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

const Qdiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 250px;
  margin-top: 621px;
`;

const Ques = styled.div`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  color: #d9d9d9;
`;

const Introduction = () => {
  const navigate = useNavigate();
  const [motivation, setMotivation] = useState(""); // 초기값을 빈 문자열로 설정
  const [teamwork, setTeamwork] = useState(""); // 초기값을 빈 문자열로 설정
  const [effort, setEffort] = useState(""); // 초기값을 빈 문자열로 설정
  const [aspiration, setAspiration] = useState(""); // 초기값을 빈 문자열로 설정
  const [applicationId, setApplicationId] = useState(null); // applicationId 초기값을 null로 설정
  const [name, setName] = useState("");
  const [customQuestions, setCustomQuestions] = useState(null);

  const handleBoxClick = () => {
    navigate("/mypage");
  };
  const handleModiClick = () => {
    navigate(`/mypage/Introduction/${applicationId}`);
  };

  const handleSaveOrUpdate = async () => {
    const accessToken = localStorage.getItem("authorization");
    navigate("/mypage/introduction");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const url = applicationId
      ? `${process.env.REACT_APP_SERVER}/api/user/application?applicationId=${applicationId}`
      : `${process.env.REACT_APP_SERVER}/api/user/application`;

    const method = applicationId ? "put" : "post";

    const requestData = {
      name: name, // Dynamically using the 'name' state
      motivation: motivation, // Dynamically using the 'motivation' state
      teamwork: teamwork, // Dynamically using the 'teamwork' state
      aspiration: aspiration, // Dynamically using the 'aspiration' state
      effort: effort, // Dynamically using the 'effort' state
      customQuestions: customQuestions || [], // Dynamically using the 'customQuestions' state, defaulting to an empty array
    };

    try {
      console.log("Request Data:", requestData);
      const response = await axios({
        method,
        url,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        // 응답에서 applicationId를 받아서 알림창에 출력
        const applicationId = response.data.applicationId;
        alert(
          applicationId
            ? `applicationId: ${applicationId}`
            : `applicationId(저장완료): ${applicationId}`
        );
        setApplicationId(applicationId);
      } else {
        alert(`요청에 실패했습니다: ${response.data}`);
      }
    } catch (error) {
      console.error("지원서 처리 중 오류:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
      }
      alert("저장/수정에 실패했습니다.");
    }
  };

  const handleInput = (e, field) => {
    const value = e.target.value;
    console.log(`Changing ${field} to: `, value); // 값이 제대로 넘어오는지 확인
    if (field === "name") {
      setName(value);
    } else if (field === "motivation") {
      setMotivation(value);
    } else if (field === "teamwork") {
      setTeamwork(value);
    } else if (field === "effort") {
      setEffort(value);
    } else if (field === "aspiration") {
      setAspiration(value);
    } else if (field === "customQuestions") {
      setCustomQuestions(value);
    }
  };

  return (
    <>
      <Title type="text" value={name} onChange={(e) => handleInput(e, "name")}>
        <Titles placeholder="지원서명을 작성해주세요." />
      </Title>
      <Maindiv>
        <Subtitle style={{ marginTop: "19px" }}>
          1. 지원동기를 적어주세요.
        </Subtitle>
        <Subtitle style={{ marginTop: "162px" }}>
          2. 기억에 남는 팀 활동과 팀 내 본인의 역할을 적어주세요.
        </Subtitle>
        <IntroInput
          type="text"
          handleInput={handleInput}
          values={{
            motivation,
            teamwork,
            effort,
            aspiration,
          }}
        />

        <Subtitle style={{ marginTop: "303px" }}>
          3. 직무에 필요한 전문성(지식/기술)을 쌓기 위하여 <br />
          어떠한 노력을 하였는지 적어주세요.
        </Subtitle>

        <Subtitle style={{ marginTop: "456px" }}>
          4. 입사 후의 포부를 적어주세요.
        </Subtitle>

        <Qdiv>
          <Ques>질문 추가하기</Ques>
          <Plus />
        </Qdiv>
      </Maindiv>
      <MDdiv>
        <Modi1 onClick={handleBoxClick}>목록으로</Modi1>
        <Modi2 onClick={(handleSaveOrUpdate, handleModiClick)}>저장하기</Modi2>
      </MDdiv>
    </>
  );
};

export default Introduction;
