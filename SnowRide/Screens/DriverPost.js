import { StyleSheet, Text, View } from "react-native";
import PostForm from "../Components/Post/PostForm";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase-setup";

export default function DriverPost() {
  const [posts, setPosts] = useState([]);

  // const q = query(
  //   collection(firestore, "posts"),
  //   where("category", "==", "driver")
  // );
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const posts = [];
  //   querySnapshot.forEach((doc) => {
  //     posts.push(doc.data().name);
  //   });
  //   console.log("Driver posts:", posts.join(","));
  // });
  useEffect(() => {
    const q = query(
      collection(firestore, "posts"),
      where("category", "==", "driver")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setPosts([]);
        console.log("empty");
      } else {
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          console.log(snap.id);
          docs.push({ ...snap.data(), id: snap.id });
        });
        console.log(docs);
        setPosts(docs);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <PostForm posts={posts} />;
}

const styles = StyleSheet.create({});
