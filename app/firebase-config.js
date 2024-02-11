import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDFGeKUG2ONzfIAfpffqOIcYHPW-OVhMZw",
  authDomain: "file-upload-app-c1064.firebaseapp.com",
  projectId: "file-upload-app-c1064",
  storageBucket: "file-upload-app-c1064.appspot.com",
  messagingSenderId: "622254394196",
  appId: "1:622254394196:web:ace3f07cff6a4b7d85d6c1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)