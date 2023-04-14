import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
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

export async function writeToDBBooking(booking) {
  try {
    const docRef = await addDoc(collection(firestore, "bookings"), {
      ...booking,
      post_book_user: auth.currentUser.uid,
    });
    // console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function writeToDBMessage(message) {
  try {
    const docRef = await addDoc(collection(firestore, "messages"), {
      ...message,
      time: new Date(),
    });
    // console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateDB(id, newData) {
  try {
    const updateRef = await updateDoc(doc(firestore, "posts", id), newData);
  } catch (err) {
    console.log(err);
  }
}

export async function getUserInfo(id) {
  try {
    const user = await getDoc(doc(firestore, "users", id));
    return user._document.data.value.mapValue.fields;
    // return user.data;
  } catch (err) {
    console.log("GetUser", err);
  }
}

export async function saveUserInfo(data) {
  try {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), data, {
      merge: true,
    });
    console.log("updated userInfo");
  } catch (err) {
    console.log("SaveUserInfo", err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(firestore, "posts", id));
  } catch (err) {
    console.log(err);
  }
}
