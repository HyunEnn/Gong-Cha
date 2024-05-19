import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { testStore } from '@/stores/testStore';

// Firebase Config values imported from .env file
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

async function initializeFirebaseMessaging() {
  const supported = await isSupported();
  if (supported) {
    const messaging = getMessaging(app);
    return messaging;
  } else {
    console.warn("This browser doesn't support Firebase Messaging.");
    return null;
  }
}

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

      const messaging = await initializeFirebaseMessaging();
      if (!messaging) return;

      try {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
        });

        if (token) {
          console.log("token: ", token);
          createToken(token);  // Zustand store의 액션을 호출
        } else {
          console.log("Can not get Token");
        }

        onMessage(messaging, (payload) => {
          console.log("메시지가 도착했습니다.", payload);
          createPayload(payload);
        });
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    }

    requestPermission();
  }, [createToken, createPayload]);

  return null;
}

export default FirebaseComponent;
