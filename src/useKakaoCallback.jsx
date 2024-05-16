import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Page_Url } from "./Page_Url";

function useKakaoCallback() {
  //   const navigate = useNavigate();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:5173/kakao/callback`);
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const authorizationHeader = response.headers.get("Authorization");
    //     const Header = response.headers;
    //     console.log(response);
    //     console.log(authorizationHeader);
    //     console.log(Header);
    //     if (authorizationHeader) {
    //       // Bearer 토큰 형식일 경우
    //       const accessToken = authorizationHeader;
    //       // localStorage에 토큰 저장
    //       localStorage.setItem("accessToken", accessToken);
    //       console.log("Access token stored in localStorage:", accessToken);
    //       navigate(Page_Url.Main, { replace: true });
    //     } else {
    //       throw new Error("Authorization header not found");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}

export default useKakaoCallback;
