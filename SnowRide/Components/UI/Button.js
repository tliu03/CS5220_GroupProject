import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button({ children, onPress, style }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.buttonStyle, pressed && style.pressed]}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 4,
    padding: 8,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});
