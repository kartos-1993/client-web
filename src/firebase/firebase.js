import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
 
};

console.log(firebaseConfig)
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const actionCodeSettings = {
  url: import.meta.env.VITE_REGISTER_REDIRECT_URL,
  handleCodeInApp: true,
};

// export const SignUpWithEmailLink = (auth, email, actionCodeSettings) => {

// };

//  apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
