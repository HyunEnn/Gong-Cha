import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { testStore } from '@/stores/testStore';

// Firebase Config values imported from .env file
// working *
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
          vapidKey: 'BL5bGjPDt2MnX-POT3mQrKhqi_l4UE1oUXQr0FIhMVOgMpU6S4GKrvTP9hBxpcL4AxFr65GvC-9jUSJw8zUbFes',
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
