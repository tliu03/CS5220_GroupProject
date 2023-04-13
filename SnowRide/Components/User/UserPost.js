import { View, Text, Modal, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { auth, firestore } from "../../FireBase/firebase-setup";
import { Auth } from "../../FireBase/firebase-setup";
import PostList from "../Post/PostDetail/PostList";

export default function UserPost({ UserID }) {
  const [myPosts, setMyposts] = useState();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "posts"),
        where("user", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setMyposts([]);
        } else {
          let docs = [];
          // we want to update goals array with the data THAT we get in this array
          querySnapshot.docs.forEach((snap) => {
            // console.log(snap.id);
            docs.push({ ...snap.data(), id: snap.id });
          });
          // console.log(docs);
          setMyposts(docs);
        }
      },
      (error) => {
        console.log("onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <PostList posts={myPosts} myPosts={true} showCategory={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 20,
  },
});
