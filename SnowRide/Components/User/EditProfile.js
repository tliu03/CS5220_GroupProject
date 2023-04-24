import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import FormButton from "../UI/FormButton";
import ImageManager from "./ImageManager";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../../FireBase/firebase-setup";
import { saveUserInfo } from "../../FireBase/firebase-helper";

const EditProfile = ({ navigation, route }) => {
  const user = route.params;
  // console.log("edit user", user);
  const [userData, setUserData] = useState({
    name: {
      firstname: user.name.firstname ? user.name.firstname : "",
      lastname: user.name.lastname ? user.name.lastname : "",
    },
    description: user.description ? user.description : "",
    phone: user.phone ? user.phone : "",
    country: user.country ? user.country : "",
    city: user.city ? user.city : "",
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const handleUpdate = async () => {
    // console.log(userData);
    saveUserInfo(userData);
    // let imgUrl = await uploadImage();

    // if (imgUrl == null && userData.userImg) {
    //   imgUrl = userData.userImg;
    // }

    // firestore()
    //   .collection("users")
    //   .doc(user.uid)
    //   .update({
    //     fname: userData.fname,
    //     lname: userData.lname,
    //     about: userData.about,
    //     phone: userData.phone,
    //     country: userData.country,
    //     city: userData.city,
    //     userImg: imgUrl,
    //   })
    //   .then(() => {
    //     console.log("User Updated!");
    //     Alert.alert(
    //       "Profile Updated!",
    //       "Your profile has been updated successfully."
    //     );
    //   });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      setImage(null);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {/* <Button
          title="Choose Profile Picture"
          onPress={handleChoosePhoto}
        /> */}
        {/* <ImageManager imageUriHandler={imageUriHandler} /> */}
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#333333" size={20} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData.name.firstname}
          onChangeText={(txt) =>
            setUserData({
              ...userData,
              name: { ...userData.name, firstname: txt },
            })
          }
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#333333" size={20} />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          value={userData.name.lastname}
          onChangeText={(txt) =>
            setUserData({
              ...userData,
              name: { ...userData.name, lastname: txt },
            })
          }
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="About Me"
          placeholderTextColor="#666666"
          value={userData.description}
          onChangeText={(txt) => setUserData({ ...userData, description: txt })}
          autoCorrect={true}
          style={[styles.textInput, { height: 40 }]}
        />
      </View>
      <View style={styles.action}>
        <Feather name="phone" color="#333333" size={20} />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          value={userData.phone}
          onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
          style={styles.textInput}
        />
      </View>

      <View style={styles.action}>
        <FontAwesome name="globe" color="#333333" size={20} />
        <TextInput
          placeholder="Country"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData.country}
          onChangeText={(txt) => setUserData({ ...userData, country: txt })}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <MaterialCommunityIcons
          name="map-marker-outline"
          color="#333333"
          size={20}
        />
        <TextInput
          placeholder="City"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData.city}
          onChangeText={(txt) => setUserData({ ...userData, city: txt })}
          style={styles.textInput}
        />
      </View>
      <Button onPress={handleUpdate}>Update</Button>
      {/* <FormButton buttonTitle="Update" onPress={handleUpdate} /> */}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 10,
    color: "#333333",
  },
});
