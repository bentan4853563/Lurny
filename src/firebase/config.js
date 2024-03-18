// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJyHc-WKBk_doD07vaa75FZ_rngK0i_3c",
  authDomain: "lurny-831cf.firebaseapp.com",
  projectId: "lurny-831cf",
  storageBucket: "lurny-831cf.appspot.com",
  messagingSenderId: "1089914664841",
  appId: "1:1089914664841:web:20d1cab93427063736d358",
  // measurementId: "G-4X3VFSB9NH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
