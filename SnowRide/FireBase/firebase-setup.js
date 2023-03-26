import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "@env";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

// Get a list of posts from your database
// async function getPost(db) {
//   const postCollection = collection(db, "post");
//   const postSnapshot = await getDocs(postCollection);
//   const postList = postSnapshot.docs.map((doc) => doc.data());
//   return postList;
// }
