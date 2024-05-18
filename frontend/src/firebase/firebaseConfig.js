import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { testStore } from '@/stores/testStore';

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: "AIzaSyB1CovfjHcmoLB5zbY1cTODXOqxx_qHJsM",
  authDomain: "gongcha-bb1b7.firebaseapp.com",
  projectId: "gongcha-bb1b7",
  storageBucket: "gongcha-bb1b7.appspot.com",
  messagingSenderId: "419866733649",
  appId: "1:419866733649:web:fd0e9884599936d91c1c70",
  measurementId: "G-ERYDL70C9D"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function FirebaseComponent() {
  const { createToken, createPayload } = testStore();

  useEffect(() => {
    async function requestPermission() {
      console.log("권한 요청 중...");

      const permission = await Notification.requestPermission();
      if (permission === "denied") {
        console.log("알림 권한 허용 안됨");
        return;
      }

      console.log("알림 권한이 허용됨");

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      });

      if (token) {
        console.log("token: ", token);
        createToken(token);  // Zustand store의 액션을 호출
      }
      else console.log("Can not get Token");

      onMessage(messaging, (payload) => {
        console.log("메시지가 도착했습니다.", payload);
        createPayload(payload);
      });
    }

    requestPermission();
  }, [createToken]);

  return null;
}

export default FirebaseComponent;
