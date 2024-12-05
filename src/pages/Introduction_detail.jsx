import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import IntroInput from "../components/mypage/IntroInput";

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

const Modi = styled.button`
  width: 200px;
  height: 33px;
  border-radius: 30px;
  background: #d9d9d9;
  color: #3a00f9;
  border: none;
  font-family: "Noto Sans";
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 80px;
  margin-left: 25px;

  &:hover {
    background: #2900b3;
    color: white;
  }
`;
const Modi1 = styled.button`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  background-color: #3a00f9;
  border-radius: 30px;
  color: #fff;
  border: none;
  width: 90px;
  height: 33px;
  white-space: nowrap;
  text-align: center;
  margin-top: 16px;
  margin-left: 55px;
  &:hover {
    background: #2900b3;
    color: white;
  }
`;

const Modi2 = styled.button`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  background-color: #3a00f9;
  border-radius: 30px;
  color: white;
  border: none;
  width: 90px;
  height: 33px;
  white-space: nowrap;
  text-align: center;
  margin-top: 16px;
  margin-left: 15px;
  margin-right: 25px;
  flex-direction: row;
  &:hover {
    background: #2900b3;
    color: white;
  }
`;
const Introduction_detail = () => {
  const { applicationId } = useParams(); // URL에서 applicationId 추출
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [motivation, setMotivation] = useState("");
  const [teamwork, setTeamwork] = useState("");
  const [effort, setEffort] = useState("");
  const [aspiration, setAspiration] = useState("");
  const [name, setName] = useState("");
  const [customQuestions, setCustomQuestions] = useState(null);

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/user/application?applicationId=${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;

          console.log(data); // 데이터 확인
          // 상태 업데이트
          setName(data.name || "");
          setMotivation(data.motivation || "");
          setTeamwork(data.teamwork || "");
          setEffort(data.effort || "");
          setAspiration(data.aspiration || "");
          setCustomQuestions(data.customQuestions || "");
        } else {
          console.error("지원서를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("지원서 조회 오류:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchApplicationDetail();
  }, [applicationId]);

  const handleInput = (e, field) => {
    const value = e.target.value;
    if (field === "name") setName(value);
    else if (field === "motivation") setMotivation(value);
    else if (field === "teamwork") setTeamwork(value);
    else if (field === "effort") setEffort(value);
    else if (field === "aspiration") setAspiration(value);
    else if (field === "customQuestions") setCustomQuestions(value);
  };

  const handleUpdateApplication = async () => {
    const accessToken = localStorage.getItem("authorization");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const requestData = {
      name,
      motivation,
      teamwork,
      effort,
      aspiration,
      customQuestions: customQuestions || [],
    };

    try {
      const url = `${process.env.REACT_APP_SERVER}/api/user/application?applicationId=${applicationId}`;
      const response = await axios.put(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        alert("수정이 완료되었습니다.");
        // 서버에서 반환된 응답 데이터로 상태 업데이트
        const updatedData = response.data;
        console.log("서버 응답:", response.data);

        setName(updatedData.name || name); // 이름 즉시 반영
        setMotivation(updatedData.motivation || motivation);
        setTeamwork(updatedData.teamwork || teamwork);
        setEffort(updatedData.effort || effort);
        setAspiration(updatedData.aspiration || aspiration);
        setCustomQuestions(updatedData.customQuestions || customQuestions);
        navigate("/mypage");
      } else {
        alert(`수정에 실패했습니다: ${response.data}`);
      }
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
      alert("수정에 실패했습니다.");
    }
  };

  const handleBoxClick = () => {
    navigate("/mypage");
  };

  const handleDeleteApplication = async () => {
    const accessToken = localStorage.getItem("authorization");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const url = `${process.env.REACT_APP_SERVER}/api/user/application/`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        alert("지원서가 삭제되었습니다.");
        navigate("/mypage"); // 삭제 후 마이페이지로 이동
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <Container>
        <Title>
          <Titles
            value={name} // 상태에서 가져온 값 표시
            onChange={(e) => handleInput(e, "name")} // 상태 업데이트
            placeholder="이름을 입력하세요"
          />
        </Title>
        <Maindiv>
          <Subtitle style={{ marginTop: "19px" }}>
            1. 지원동기를 적어주세요.
          </Subtitle>
          <Subtitle style={{ marginTop: "162px" }}>
            2. 기억에 남는 팀 활동과 팀 내 본인의 역할을 적어주세요.
          </Subtitle>
          <Subtitle style={{ marginTop: "303px" }}>
            3. 직무에 필요한 전문성(지식/기술)을 쌓기 위하여 <br />
            어떠한 노력을 하였는지 적어주세요.
          </Subtitle>
          <Subtitle style={{ marginTop: "456px" }}>
            4. 입사 후의 포부를 적어주세요.
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
        </Maindiv>

        <MDdiv>
          <Modi onClick={handleBoxClick}>목록으로 돌아가기</Modi>
          <Modi1 onClick={handleUpdateApplication}>수정하기</Modi1>
          <Modi2 onClick={handleDeleteApplication}>삭제하기</Modi2>
        </MDdiv>
      </Container>
    </>
  );
};

export default Introduction_detail;
