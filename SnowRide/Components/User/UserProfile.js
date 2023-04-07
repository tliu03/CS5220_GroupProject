import { auth } from "../../FireBase/firebase-setup";
import Button from "../UI/Button";
import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function UserProfile({ navigation }) {
  function MyPostHandler() {
    navigation.navigate("UserPosts");
  }
  console.log(auth.currentUser.uid);

  function EditProfileHandler() {
    navigation.navigate("EditProfile");
  }
  function LogOutHandler() {
    auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Image style={styles.userImg} source={require("../../assets/user.png")} />
      <Text style={styles.userName}>Adam</Text>
      <Text style={styles.aboutUser}>User Description</Text>
      <Text>{auth.currentUser.email}</Text>
      {/* <Text>{auth.currentUser.uid}</Text> */}
      <View style={styles.userBtnWrapper}>
        <Button style={styles.userBtn} onPress={EditProfileHandler}>
          Edit
        </Button>
        <Button style={styles.userBtn} onPress={LogOutHandler}>
          Log Out
        </Button>
      </View>

      {/* <Text>You've logged in as {auth.currentUser.email}</Text>
        <Text>Your id is {auth.currentUser.uid}</Text>
        <Button onPress={() => auth.signOut()}>Sign Out</Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    // marginBottom: 10,
  },
  userBtn: {
    width: 100,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
