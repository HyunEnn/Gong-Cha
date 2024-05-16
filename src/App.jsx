// import { useState } from "react";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// import LogoutButton from "./assets/components/LogoutButton.jsx";
import { Route, Routes } from "react-router-dom";
import { Page_Url } from "./Page_Url.jsx";
import KakaoCallback from "./KakaoCallback.jsx";
import MainPage from "./MainPage.jsx";

// const onKakakoLogin = () => {
// window.location.href = "http://localhost:8081/api/oauth2/authorization/kakao";
// };

// function useKakaoCallback() {

//   useEffect(() => {
//     // URLSearchParams를 사용하여 쿼리 파라미터 접근
//     const authorizationHeader = response.headers.get('authorization');
//     if (authorizationHeader) {
//       // Bearer 토큰 형식일 경우
//       const accessToken = authorizationHeader.split(' ')[1];

//       // localStorage에 토큰 저장
//       localStorage.setItem('accessToken', accessToken);
//       console.log('Access token stored in localStorage:', accessToken);
//   } else {
//       throw new Error('Authorization header not found');
//   }

//   return <div>로그인 처리 중입니다...</div>;
// }

// const logOutData = () => {
//   fetch("http://localhost:8080/logout"), {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     }
//   }
// }

function App() {
  return (
    <>
      <Routes>
        <Route path={Page_Url.KakaoCallback} element={<KakaoCallback />}></Route>
        <Route path={Page_Url.MainPage} element={<MainPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
