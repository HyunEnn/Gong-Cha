import { getTeamInfo, setTeamInfo } from '@/apis/api/test';

const onNaverLogin = () => {
  window.location.href = "http://k10b306.p.ssafy.io:8081/api/oauth2/authorization/naver";
};

const onKakakoLogin = () => {
  window.location.href = "http://k10b306.p.ssafy.io:8081/api/oauth2/authorization/kakao";
};

const onGoogleLogin = () => {
  window.location.href = "http://k10b306.p.ssafy.io:8081/api/oauth2/authorization/google";
};

const getData = () => {
        console.log("엄");
        // axios for db connection
        getTeamInfo(
            1,
            (success) => {
                console.log(success.data.data.content[0]);
            },
            (fail) => {
                
            }
        );
        // setTeamInfo(
        //   {
        //     "matchType": "내전",
        //     "region": "강원도",
        //     "district": "양양시",
        //     "startTime": 9,
        //     "endTime": 18,
        //     "dayOfWeek": ["월", "수", "목", "금"],
        //     "difficulty": "초급",
        //     "userList": [3],
        //     "writerId": 1
        //   },
        //   (success) => {
        //       console.log(success.data);
        //   },
        //   (fail) => {
              
        //   }
        // );
};

const getDat2a = () => {
  const data = {
    "matchType": "내전",
    "region": "강원도",
    "district": "양양시",
    "startTime": 9,
    "endTime": 18,
    "dayOfWeek": ["월", "수", "목", "금"],
    "difficulty": "초급",
    "userList": [3],
    "writerId": 1
  };
  console.log("엄2");
  // axios for db connection
  setTeamInfo(
    data,
    (success) => {
        console.log(success.data);
    },
    (fail) => {
        
    }
  );
};

// const logOutData = () => {
//   fetch("http://localhost:8080/logout"), {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     }
//   }
// }

function Test() {
  return (
    <>
      <h2>NAVER</h2>
      <button onClick={onNaverLogin}>NAVER LOGIN</button>
      <br></br>
      <h2>KAKAO</h2>
      <button onClick={onKakakoLogin}>KAKAO LOGIN</button>
      <br></br>
      <h2>GOOGLE</h2>
      <button onClick={onGoogleLogin}>GOOGLE LOGIN</button>
      <br></br>
      <button onClick={getDat2a}>GET DATA</button>
    </>
  );
}

export default Test;
