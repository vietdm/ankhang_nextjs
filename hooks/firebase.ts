import { initializeApp } from "firebase/app";
import { initializeAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(firebaseApp);

export const createCapcha = (id: string, callback?: any) => {
  return new RecaptchaVerifier(id, {
    size: 'invisible',
    callback: () => {
      if (callback) callback();
    }
  }, firebaseAuth);
}

export const sendOtpSms = (phone: string, appVerifier: RecaptchaVerifier) => {
  return new Promise((resolve, reject) => {
    signInWithPhoneNumber(firebaseAuth, phone, appVerifier)
      .then((sendOtpResult) => {
        return resolve(sendOtpResult);
      }).catch((error) => {
        console.log(error);
        return reject(error);
      });
  });
}
