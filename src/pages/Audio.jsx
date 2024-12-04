import React, { useEffect, useState }from "react";
import styled from "styled-components";
import { Container} from "../components/PageLayout";
import { Header } from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import Play from "../img/Play.png"
import Stop from "../img/Stop.png"
import axios from "axios";
import RecordRtc from "recordrtc"

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 29px;
`

const Time = styled.div`
  text-align: center;
  font-family: "Noto Sans";
  font-size: 24px;
  font-weight: 600;
  align-self: stretch;
  margin-top: 150px;
`
const Button = styled.div`
  width: 110px;
  height: 110px;
  .img{
    width: 110px;
    height: 110px;
    object-fit: contain;
  }
`
const Text = styled.div`
  text-align: center;
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 500;
`

const Question = styled.div`
  color: #3A00F9;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 500;
  margin-top: 130px;
`

const Audio = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const interviewId = location.state?.interviewId;
    const [isRecording, setIsRecording] = useState(false);
    const [remainingQuestions, setRemainingQuestions] = useState(5);
    const [seconds, setSeconds] = useState(15 * 60);
    const [recorder, setRecorder] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    
    const handleBackClick = () => {
        navigate(-1);
    };
    
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/interview-summary');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    const StartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMediaStream(stream);
            
            const newRecorder = new RecordRtc(stream, {
                type: 'audio',
                mimeType: 'audio/wav',
                recorderType: RecordRtc.StereoAudioRecorder,
                numberOfAudioChannels: 1,
                desiredSampRate: 44100
            });
            
            newRecorder.startRecording();
            setRecorder(newRecorder);
            setIsRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
            alert("마이크 접근 권한이 필요합니다.");
        }
    };

    const StopRecording = () => {
        if (!recorder) return;

        recorder.stopRecording(() => {
            const blob = recorder.getBlob();
            const audioFile = new File([blob], 'audio.wav', { type: 'audio/wav' });
            
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
                setMediaStream(null);
            }

            const formData = new FormData();
            formData.append('wav file', audioFile);

            const token = localStorage.getItem('authorization');
            axios.post(
                `${process.env.REACT_APP_SERVER}/api/interview/interview?interviewId=${interviewId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                    responseType: 'blob'
                }
            )
            .then(response => {
                const blob = new Blob([response.data], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                const audioElement = document.createElement('audio');
                audioElement.src = url;
                audioElement.play();

                setRecorder(null);
                setIsRecording(false);

                console.log('Upload success and playing response');
                setRemainingQuestions(prev => {
                    const newCount = prev - 1;
                    if (newCount <= 0) {
                        navigate('/interview-summary');
                    }
                    return newCount;
                });
            })
            .catch(error => {
                console.error("Upload error:", error);
                if (error.response) {
                    alert(`업로드 실패: ${error.response.data.message || '서버 오류가 발생했습니다.'}`);
                } else if (error.request) {
                    alert('서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.');
                } else {
                    alert('업로드 중 오류가 발생했습니다.');
                }
                setRecorder(null);
                setIsRecording(false);
            });
        });
    };

    const handleRecordClick = () => {
        if (!isRecording) {
            StartRecording();
        } else {
            StopRecording();
        }
    };

    return (
        <Container>
            <Header title="음성 면접" onBackClick={handleBackClick}/>
            <Contents>
            <Time>진행 시간 {formatTime(seconds)}</Time>
                <Button onClick={handleRecordClick}>
                    <img src={isRecording ? Stop : Play} alt={isRecording ? "stop" : "play"}/>
                </Button>
                <Text>
                    {isRecording ? (
                    <>
                    녹음 완료하기<br/>(다음 질문)
                    </>
                    ) : (
                    <>녹음 시작하기<br/>
                    (답변 시작)
                    </>)}
                </Text>
                <Question>남은 질문 개수: {remainingQuestions}개</Question>
            </Contents>
        </Container>
    );
};

export default Audio;