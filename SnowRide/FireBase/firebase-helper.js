import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function writeToDB(post) {
  try {
    const docRef = await addDoc(collection(firestore, "posts"), post);
    console.log(docRef.id);
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
