import { Routes, Route, BrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/globalstyles";
import Navbar from "./components/Navbar";

import MainBeforeLogin from "./pages/MainBeforeLogin";
import LogIn from "./pages/LogIn";
import SignIn from "./pages/SignIn";
import Intro1 from "./pages/Intro1";
import Intro2 from "./pages/Intro2";
import Intro3 from "./pages/Intro3";
import Intro4 from "./pages/Intro4";
import Main from "./pages/Main";
import InterviewQuestion from "./pages/InterviewQuestion";
import MockInterview from "./pages/MockInterview";
import TechInterview from "./pages/TechInterview";
import CommonInterview from "./pages/CommonInterview";
import IntegratedInterview from "./pages/IntegratedInterview";
import InterviewOptions from "./pages/InterviewOptions";
import Video from "./pages/Video";
import GroupVideo from "./pages/GroupVideo";
import Audio from "./pages/Audio";
import InterviewSummary from "./pages/InterviewSummary";
import Mypage from "./pages/Mypage";
import Resume from "./pages/Resume";
import Introduction from "./pages/Introduction";
import Introduction_detail from "./pages/Introduction_detail";
import Archive from "./pages/Archive";
import ProfileEdit from "./pages/ProfileEdit";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <div className="app-container">
          <Navbar />
          <Routes>
            {/* 로그인 전 메인화면 */}
            <Route path="/" element={<MainBeforeLogin />} />
            {/* 로그인 전 인트로 */}
            <Route path="/intro">
              <Route index element={<Intro1 />} />
              <Route path="2" element={<Intro2 />} />
              <Route path="3" element={<Intro3 />} />
              <Route path="4" element={<Intro4 />} />
            </Route>

            {/* 로그인/회원가입 */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignIn />} />

            {/* 로그인 후 메인페이지 */}
            <Route path="/main" element={<Main />} />

            {/* 면접 예상 질문 페이지 */}
            <Route path="/interviewquestion" element={<InterviewQuestion />} />

            {/* 모의 면접 선택 */}
            <Route path="/interview" element={<MockInterview />} />
            <Route path="/interview/technical" element={<TechInterview />} />
            <Route path="/interview/common" element={<CommonInterview />} />
            <Route
              path="/interview/integrated"
              element={<IntegratedInterview />}
            />

            {/* 면접 옵션 선택 */}
            <Route path="/interview/options" element={<InterviewOptions />} />

            {/* 화상 면접 */}
            <Route path="/video" element={<Video />} />
            <Route path="/group-video" element={<GroupVideo />} />

            {/* 음성 면접 */}
            <Route path="/audio" element={<Audio />} />

            {/* 면접 종료 후 총평 페이지 */}
            <Route path="/interview-summary" element={<InterviewSummary />} />

            {/* 마이 페이지 */}
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/resume" element={<Resume />} />
            <Route path="/mypage/introduction" element={<Introduction />} />
            <Route
              path="/mypage/introduction/:applicationId"
              element={<Introduction_detail />}
            />
            <Route path="/mypage/archive" element={<Archive />} />
            <Route path="/mypage/profile-edit" element={<ProfileEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
