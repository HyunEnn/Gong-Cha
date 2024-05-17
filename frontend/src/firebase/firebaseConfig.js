import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_API_KEY,
//   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_APP_ID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
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

// Messaging service
export const messaging = getMessaging(app);