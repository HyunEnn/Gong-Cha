import { useState } from "react";
import axios from "axios";

const LogoutButton = () => {
  const [logoutResult, setLogoutResult] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      setLogoutResult(response.data.message); // 로그아웃 성공 메시지 설정
    } catch (error) {
      console.error("로그아웃 오류:", error);
      setLogoutResult("로그아웃 실패"); // 로그아웃 실패 메시지 설정
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <p>{logoutResult}</p>
    </div>
  );
};

export default LogoutButton;
