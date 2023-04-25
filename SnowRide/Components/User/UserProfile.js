import Button from "../UI/Button";
import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { firestore, auth } from "../../FireBase/firebase-setup";
import { getUserInfo } from "../../FireBase/firebase-helper";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../FireBase/firebase-setup";

export default function UserProfile({ navigation }) {
  const [user, setUser] = useState({
    name: { firstname: "", lastname: "" },
    description: "",
    phone: "",
    country: "",
    city: "",
    userImg: "",
  });
  console.log("curr_user", auth.currentUser.uid, user);

  function EditProfileHandler() {
    console.log(user);
    navigation.navigate("EditProfile", user);
  }
  function LogOutHandler() {
    auth.signOut();
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, "users", auth.currentUser.uid),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setUser(null);
          // console.log("empty");
        } else {
          // console.log(querySnapshot);
          setUser(querySnapshot.data());
          console.log("user data", user);
        }
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <View style={styles.container}>
      {user.userImg ? (
        <Image style={styles.userImg} source={{ uri: user.userImg }} />
      ) : (
        <Image
          style={styles.userImg}
          source={require("../../assets/user.png")}
        />
      )}
      <Text style={styles.userName}>
        {user.name ? user.name.firstname : "complete your profile first"}
      </Text>
      <Text style={styles.aboutUser}>
        {user.description
          ? user.description.stringValue
          : "complete your profile first"}
      </Text>
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
