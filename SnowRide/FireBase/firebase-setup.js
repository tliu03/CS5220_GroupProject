import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
// } from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyBi1qKk5Ej8eELKlh1P31RqyOPiRTGGWfE",
  authDomain: "cs5520-assignment-b5bbb.firebaseapp.com",
  databaseURL: "https://cs5520-assignment-b5bbb-default-rtdb.firebaseio.com",
  projectId: "cs5520-assignment-b5bbb",
  storageBucket: "cs5520-assignment-b5bbb.appspot.com",
  messagingSenderId: "913020453176",
  appId: "1:913020453176:web:b6a61c4b50e966461281cd",
};
// console.log(apiKey);
const app = initializeApp(firebaseConfig);
// console.log(app);
export const firestore = getFirestore(app);
