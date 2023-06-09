import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { auth } from "../../FireBase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveUserInfo } from "../../FireBase/firebase-helper";
import { registerForPushNotificationsAsync } from "../Notification/NotificationManager";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const LoginHandler = () => {
    navigation.navigate("LogIn");
  };

  const signupHandler = async () => {
    let token;
    if (password !== confirmPassword) {
      Alert.alert("The passwords don't match");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userCred);
      token = await registerForPushNotificationsAsync();
      saveUserInfo({
        expoPushToken: token ? token : "",
        name: { firstname: null, lastname: "" },
        description: "",
        phone: "",
        country: "",
        city: "",
        userImg:
          "https://firebasestorage.googleapis.com/v0/b/cs5520-assignment-b5bbb.appspot.com/o/user.png?alt=media&token=ccd4270c-e0c7-4e53-a87f-88821fdd157a",
      });
      navigation.navigate("Home");
    } catch (err) {
      console.log("Auth error ", err);
      Alert.alert("Please Try Again!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      // when we have text input elements,
      // make sure the keyboard will not cover the input area
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Pressable onPress={LoginHandler} style={styles.backtologin}>
        <Text>Already have an account? Log In Here</Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={signupHandler}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  backtologin: {
    marginTop: 30,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
