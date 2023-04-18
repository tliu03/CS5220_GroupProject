import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Colors } from "../../../Constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({ post, showCategory, bookingHistory }) {
  // const date = formatDateTime(post.date);
  console.log("post from post Item", post);
  const navigation = useNavigation();

  function checkPostHanlder() {
    console.log("pressed");
    navigation.navigate("PostDetails", post);
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={bookingHistory ? null : checkPostHanlder}
      >
        {showCategory && <Text>Category: {post.category}</Text>}
        <Text>Destination: {post.destination}</Text>
        <Text>Pick Up Location: {post.pickupLocation}</Text>
        <Text>Date: {post.date}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary100,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 15,
    // width: '100%'
  },
  pressed: {
    opacity: 0.75,
  },
});
