import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB_wfkWsWKGW6dGLED8wCpHz7_xdyiFBNE",
  authDomain: "wealth-management-1c992.firebaseapp.com",
  projectId: "wealth-management-1c992",
//   storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "377423588229",
  appId: "115136781630588966658"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
