import { auth } from "../FireBase/firebase-setup";
import Button from "../Components/UI/Button";
import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function User({ navigation }) {
  function MyPostHandler() {
    navigation.navigate("UserPosts");
  }
  // console.log(auth.currentUser.uid);

  function MyProfileHandler() {
    navigation.navigate("UserProfile");
  }

  function MyBookingHandler() {
    console.log("Nav to booking history");
  }

  function LogOutHandler() {
    auth.signOut();
  }

  return (
    <View style={styles.container}>
      <View>
        <Button onPress={MyProfileHandler}>My Profile</Button>
        <Button onPress={MyPostHandler}>My Posts</Button>
        <Button onPress={MyBookingHandler}>My Bookings</Button>
      </View>
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
