import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 지원서
const Box3 = styled.div`
  box-sizing: border-box;
  width: 330px;
  height: 206px;
  margin-top: 52px;
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative;
`;

const Modi3 = styled.button`
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
  position: absolute;
  bottom: 16px;
  left: 240px;
`;

const Fixed = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  position: absolute;
`;

const ApplicationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ApplicationItem = styled.div`
  font-size: 16px;
  color: #000000;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #3a00f9;
  }
`;

const ApplicationList = () => {
  const [applicationData, setApplicationData] = useState([]); // 지원서 데이터 상태
  const [loading, setLoading] = useState(true);
  const [applicationId, setApplicationId] = useState(null); // applicationId 상태
  const navigate = useNavigate();

  const fetchApplicationData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/user/applicationList`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
          },
        }
      );

      if (response.status === 200) {
        const fetchedData = response.data;
        setApplicationData(fetchedData);
        setLoading(false);
      } else {
        alert("지원서 데이터를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("지원서 처리 중 오류:", error);
      alert("지원서 데이터를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const handleApplicationClick = (applicationId) => {
    navigate(`/mypage/Introduction/${applicationId}`);
  };

  const handleUploadClick = () => {
    navigate("/mypage/introduction");
  };

  const isUploadDisabled = () => {
    if (applicationData.length >= 3) {
      alert("지원서는 3개까지 작성 가능합니다.");
      return true;
    }
    return false;
  };

  const handleUploadComplete = () => {
    fetchApplicationData(); // 업로드가 완료된 후 데이터 갱신
  };
  return (
    <Box3>
      <Fixed style={{ marginTop: "29px", marginLeft: "20px" }}>
        나의 지원서
      </Fixed>
      <ApplicationListContainer>
        {applicationData.length === 0 ? (
          <div></div>
        ) : (
          applicationData.map((application) => (
            <ApplicationItem
              key={application.applicationId}
              onClick={() => handleApplicationClick(application.applicationId)}
            >
              {application.name}
            </ApplicationItem>
          ))
        )}
      </ApplicationListContainer>
      <Modi3
        onClick={() => {
          if (!isUploadDisabled()) {
            handleUploadClick();
            handleUploadComplete();
          }
        }}
        disabled={isUploadDisabled()}
      >
        업로드하기
      </Modi3>
    </Box3>
  );
};

export default ApplicationList;
