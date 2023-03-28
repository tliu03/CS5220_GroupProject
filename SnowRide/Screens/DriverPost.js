import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { firestore } from "../FireBase/firebase-setup";
import PostList from "../Components/Post/PostList";
import PostForm from "../Components/Post/PostForm";
import IconButton from "../Components/UI/IconButton";
import { Colors } from "../Constants/colors";

export default function DriverPost({ navigation }) {
  // Query Data
  const [posts, setPosts] = useState([]);

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

  // Input Modal
  const [modalVisible, setModalVisible] = useState(false);

  function addHandler() {
    setModalVisible(true);
  }
  return (
    <>
      <IconButton
        name="add"
        size={22}
        color={Colors.tertiary100}
        onPress={addHandler}
      />
      <PostForm modalIsVisible={modalVisible} driverPost={true} />
      <PostList posts={posts} />
    </>
  );
}

const styles = StyleSheet.create({});
