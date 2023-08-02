import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBkMd2gzZbxoma3OvodqOJXaRYiqiDQrYY",
  authDomain: "todo-app-24e0e.firebaseapp.com",
  databaseURL: "https://todo-app-24e0e-default-rtdb.firebaseio.com",
  projectId: "todo-app-24e0e",
  storageBucket: "todo-app-24e0e.appspot.com",
  messagingSenderId: "428493232502",
  appId: "1:428493232502:web:f907a997c9399636f34257",
  measurementId: "G-8DXYW9263Q",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);
const todoItemCollection = collection(db, "todoItem");

export { db, todoItemCollection };
