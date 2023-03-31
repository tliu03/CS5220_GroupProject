import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { auth } from "../FireBase/firebase-setup";
import Button from "../Components/UI/Button";
import UserPost from "../Components/User/UserPost";
export default function User({ navigation }) {
  function MyPostHandler() {
    navigation.navigate("UserPosts");
  }
  console.log(auth.currentUser.uid);
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
      <Button onPress={MyPostHandler}>My Post</Button>
    </View>
  );
}
