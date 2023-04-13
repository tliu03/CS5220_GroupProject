import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where, and } from "firebase/firestore";
import { firestore } from "../FireBase/firebase-setup";
import PostList from "../Components/Post/PostDetail/PostList";
import IconButton from "../Components/UI/IconButton";
import { Colors } from "../Constants/colors";

export default function DriverPost({ navigation }) {
  // Query Data
  const [posts, setPosts] = useState();

  useEffect(() => {
    const q = query(
      collection(firestore, "posts"),
      and(where("category", "==", "driver"), where("availableSpots", ">", 0))
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setPosts([]);
        // console.log("empty");
      } else {
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          // console.log(snap.id);
          docs.push({ ...snap.data(), id: snap.id });
        });
        // console.log(docs);
        setPosts(docs);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function addHandler() {
    navigation.navigate("AddPost", { category: "driver" });
  }
  return (
    <>
      <View style={styles.IconContainer}>
        <IconButton
          name="add"
          size={22}
          color={Colors.tertiary100}
          onPress={addHandler}
        />
      </View>
      <PostList posts={posts} />
    </>
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
