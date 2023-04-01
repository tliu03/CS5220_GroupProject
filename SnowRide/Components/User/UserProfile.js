import { View, Text } from "react-native";
import { auth } from "../Firebase/firebase-setup";
import React from "react";

export default function UserProfile() {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
    
  );
}
