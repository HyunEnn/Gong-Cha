// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAA7eqi8xhVjsWwUl5DE-mhaw6kJUtIH8",
  authDomain: "gongcha-994cb.firebaseapp.com",
  projectId: "gongcha-994cb",
  storageBucket: "gongcha-994cb.appspot.com",
  messagingSenderId: "343283476481",
  appId: "1:343283476481:web:927188f5f1003805ea3800",
  measurementId: "G-WZ6B8TC73S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function requestPermission() {
  console.log("권한 요청 중...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용됨");

      // FCM 메세지 처리
    } else {
      console.log("알림 권한 허용 안됨");
    }
  });
}

self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});