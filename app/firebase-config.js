import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
/*const firebaseConfig = {
  apiKey: "AIzaSyDFGeKUG2ONzfIAfpffqOIcYHPW-OVhMZw",
  authDomain: "file-upload-app-c1064.firebaseapp.com",
  projectId: "file-upload-app-c1064",
  storageBucket: "file-upload-app-c1064.appspot.com",
  messagingSenderId: "622254394196",
  appId: "1:622254394196:web:ace3f07cff6a4b7d85d6c1"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyCACl-zvmrlMjPUbVu7zvl6haWrxP2wAtQ",
  authDomain: "file-upload-app-backup.firebaseapp.com",
  projectId: "file-upload-app-backup",
  storageBucket: "file-upload-app-backup.appspot.com",
  messagingSenderId: "1840165353",
  appId: "1:1840165353:web:60875b3de27cc1e95b1b78",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const backup = true;
export const storage = getStorage(app);
