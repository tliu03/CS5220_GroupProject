import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore, auth } from "./firebase-setup";

export async function writeToDB(post) {
  try {
    const docRef = await addDoc(collection(firestore, "posts"), {
      ...post,
      user: auth.currentUser.uid,
    });
    // console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateDB(id, newData) {
  try {
    const updateRef = await updateDoc(doc(firestore, "posts", id), newData);
    console.log("updated");
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(firestore, "posts", id));
  } catch (err) {
    console.log(err);
  }
}
