// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC1erL5MNk-gS8ew95KUfmdChxIy_IPEbg",
  authDomain: "note-53459.firebaseapp.com",
  projectId: "note-53459",
  storageBucket: "note-53459.firebasestorage.app",
  messagingSenderId: "354086414346",
  appId: "1:354086414346:web:55f706c629de4cb7dd57f3",
  measurementId: "G-CDZ1SBMB9D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app