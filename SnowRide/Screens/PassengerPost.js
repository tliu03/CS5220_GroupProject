import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { firestore } from "../FireBase/firebase-setup";
import { Colors } from "../Constants/colors";
import IconButton from "../Components/UI/IconButton";
import PostForm from "../Components/Post/ManageEntry/PostForm";
import PostList from "../Components/Post/PostDetail/PostList";

export default function PassengerPost() {
  // Query Data
  const [posts, setPosts] = useState();

  useEffect(() => {
    const q = query(
      collection(firestore, "posts"),
      where("category", "==", "passenger")
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

  // Input Modal
  const [modalVisible, setModalVisible] = useState(false);

  function addHandler() {
    setModalVisible(true);
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

      <PostForm
        modalIsVisible={modalVisible}
        setModalVisibile={setModalVisible}
      />
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
