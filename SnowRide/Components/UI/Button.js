import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../Constants/colors";

export default function Button({ children, onPress, style }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.buttonStyle, pressed && styles.pressed]}
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
    backgroundColor: Colors.tertiary100,
    marginHorizontal: 20,
    marginVertical: 20,
    width: 100,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});
