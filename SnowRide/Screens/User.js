import { View, Text } from "react-native";
import React from "react";
import { auth } from "../FireBase/firebase-setup";

export default function User() {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
  );
}
