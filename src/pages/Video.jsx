import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Container } from "../components/PageLayout";
import { Header } from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import RecordRTC from "recordrtc";
import axios from "axios";

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const User = styled.div`
  width: 339px;
  height: 550px;
  background: #d9d9d9;
  border-radius: 13px;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RecordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  gap: 15px;
`;

const RecordButton = styled.div`
  width: 145px;
  height: 42px;
  border-radius: 30px;
  background: ${(props) => (props.isRecording ? "#D9D9D9" : "#2F0BFF")};
  color: ${(props) => (props.isRecording ? "#3A00F9" : "#FFF")};
  font-family: "Noto Sans";
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => (props.isRecording ? "#C9C9C9" : "#2900b3")};
  }
`;

const Question = styled.div`
  color: #3a00f9;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 500;
  padding-top: 20px;
`;

const Video = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const interviewId = location.state?.interviewId;
  const [isRecording, setIsRecording] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(5);
  const [seconds, setSeconds] = useState(15 * 60);
  const [recorder, setRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        
        setMediaStream(stream);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices.", error);
        alert("카메라와 마이크 접근 권한이 필요합니다.");
      }
    };

    getMedia();

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/interview-summary");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const startRecording = () => {
    if (!mediaStream) return;

    const newRecorder = new RecordRTC(mediaStream, {
      type: 'audio',
      mimeType: 'audio/wav',
      recorderType: RecordRTC.StereoAudioRecorder,
      numberOfAudioChannels: 1,
      desiredSampRate: 44100
    });

    newRecorder.startRecording();
    setRecorder(newRecorder);
    setIsRecording(true);
  };

  const sendAudioToServer = async (audioFile, endpoint) => {
    const formData = new FormData();
    formData.append('wav file', audioFile);
    const token = localStorage.getItem('authorization');

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER}${endpoint}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            }
        );
        return response;
    } catch (error) {
        console.error(`Error sending audio to ${endpoint}:`, error);
        throw error;
    }
};

const playAudioResponse = (blob) => {
    const url = URL.createObjectURL(blob);
    const audioElement = document.createElement('audio');
    audioElement.src = url;
    audioElement.play();
};

const stopRecording = () => {
    if (!recorder) return;

    recorder.stopRecording(async () => {
        const blob = recorder.getBlob();
        const audioFile = new File([blob], 'audio.wav', { type: 'audio/wav' });

        try {
            const interviewResponse = await sendAudioToServer(
                audioFile,
                `/api/interview/interview?interviewId=${interviewId}`
            );
            playAudioResponse(interviewResponse.data);

            await sendAudioToServer(
                audioFile,
                '/api/interview/Pronounce'
            );
            console.log('Pronunciation check completed');

            setRecorder(null);
            setIsRecording(false);

            setRemainingQuestions(prev => {
                const newCount = prev - 1;
                if (newCount <= 0) {
                    navigate('/interview-summary');
                }
                return newCount;
            });

        } catch (error) {
            let errorMessage = '오류가 발생했습니다.';
            if (error.response) {
                errorMessage = error.response.data.message || '서버 오류가 발생했습니다.';
            } else if (error.request) {
                errorMessage = '서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.';
            }
            alert(errorMessage);
            setRecorder(null);
            setIsRecording(false);
        }
    });
};

  const handleRecordClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <Container>
      <Header
        title={`진행 시간 ${formatTime(seconds)}`}
        onBackClick={handleBackClick}
      />
      <Contents>
        <User>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </User>
        <RecordContainer>
          <RecordButton isRecording={isRecording} onClick={handleRecordClick}>
            {isRecording ? "녹음 완료하기" : "녹음 시작하기"}
          </RecordButton>
        </RecordContainer>
        <Question>남은 질문 개수: {remainingQuestions}개</Question>
      </Contents>
    </Container>
  );
};

export default Video;
