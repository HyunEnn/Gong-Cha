function MainPage() {
  const onNaverLogin = () => {
    window.location.href = "http://k10b306.p.ssafy.io:8081/api/oauth2/authorization/naver";
  };
  const KAKAO_AUTH_URL = `http://localhost:8081/api/oauth2/authorization/kakao`;
  const onKakakoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const onGoogleLogin = () => {
    window.location.href = "http://k10b306.p.ssafy.io:8081/api/oauth2/authorization/google";
  };
  return (
    <>
      <div>mainpage</div>
      <h2>NAVER</h2>
      <button onClick={onNaverLogin}>NAVER LOGIN</button>
      <br></br>
      <h2>KAKAO</h2>
      <button onClick={onKakakoLogin}>KAKAO LOGIN</button>
      <br></br>
      <h2>GOOGLE</h2>
      <button onClick={onGoogleLogin}>GOOGLE LOGIN</button>
      <br></br>
      {/* <button onClick={LogoutButton}>LogOut</button> */}
    </>
  );
}

export default MainPage;
