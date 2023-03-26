import { StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-ionicons";
import React from "react";

export default function IconButton({ name, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
