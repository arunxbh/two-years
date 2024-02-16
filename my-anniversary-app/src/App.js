import "./App.css";
import PasswordPage from "./pages/Password";
import HomePage from "./pages/Home";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl7S-EKZ1R5_2ftLCi0R7AbWfRoJAkiD0",
  authDomain: "nostalgic-api.firebaseapp.com",
  projectId: "nostalgic-api",
  storageBucket: "nostalgic-api.appspot.com",
  messagingSenderId: "852540076976",
  appId: "1:852540076976:web:888530946e8d0e95039c75",
  measurementId: "G-1B67M10NC2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

function App() {
  return (
    //<PasswordPage />
    <HomePage />
  );
}

export default App;
