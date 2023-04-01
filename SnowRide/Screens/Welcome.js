import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Components/UI/Button";
import { Colors } from "../Constants/colors";

export default function Welcome({ navigation }) {
  function LoginHandler() {
    navigation.navigate("LogIn");
  }
  function SignUpHandler() {
    navigation.navigate("SignUp");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcomTextStyle}>Welcome to SnowRide</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={LoginHandler} style={styles.buttonStyle}>
          Log In
        </Button>
        <Button onPress={SignUpHandler} style={styles.buttonStyle}>
          Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    backgroundColor: Colors.primary100,
  },
  welcomTextStyle: {
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonStyle: {
    width: 100,
    height: 50,
    justifyContent: "center",
  },
});
