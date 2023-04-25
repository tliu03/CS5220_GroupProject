import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { Colors } from "../../../Constants/colors";
import Input from "./Input";
import IconButton from "../../UI/IconButton";
import Button from "../../UI/Button";
import {
  writeToDB,
  updateDB,
  saveUserInfo,
  getUserInfo,
} from "../../../FireBase/firebase-helper";
import { registerForPushNotificationsAsync } from "../../Notification/NotificationManager";
import { auth } from "../../../FireBase/firebase-setup";

// Add form
export default function PostForm({ route, navigation }) {
  // console.log(route.params);
  const post = route.params;
  // console.log(post);
  const [date, setDate] = useState(new Date());
  // if (post.date) {
  //   setDate(new Date(post.date));
  // }

  const [postEntry, setPostEntry] = useState({
    category: post.category ? post.category : "",
    // date: post.date ? post.date : new Date(),
    destination: post.destination ? post.destination : "",
    pickupLocation: post.pickupLocation ? post.pickupLocation : "",
    price: post.price ? post.price : 0,
    availableSpots: post.availableSpots ? post.availableSpots : 0,
    equipmentRoom: post.equipmentRoom ? "yes" : "no",
  });
  // console.log("postentry", postEntry);

  function entryInputHandler(inputIdentifier, enteredValue) {
    setPostEntry((currValue) => {
      return {
        ...currValue,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  // function onDateChange(event, selectedDate) {
  //   const currentDate = selectedDate;
  // }

  function resetFormHandler() {
    setPostEntry({
      category: "",
      date: null,
      destination: "",
      pickupLocation: "",
      price: 0,
      availableSpots: 0,
      equipmentRoom: true,
    });
  }

  async function submitFormHanlder() {
    const entryData = {
      category: postEntry.category,
      date: date,
      destination: postEntry.destination,
      pickupLocation: postEntry.pickupLocation,
      price: Number(postEntry.price),
      availableSpots: Number(postEntry.availableSpots),
      equipmentRoom: postEntry.equipmentRoom,
    };
    const dateIsValid =
      new Date(entryData.date).valueOf() > new Date().valueOf();
    const availableSpotsIsValid =
      !isNaN(entryData.availableSpots) && entryData.availableSpots >= 1;
    const destinationIsValid = entryData.destination.trim().length > 0;
    const pickupLocationIsValid = entryData.pickupLocation.trim().length > 0;
    const priceIsValid = !isNaN(entryData.price);
    const equipmentRoomIsValid =
      entryData.equipmentRoom === "yes" || entryData.equipmentRoom === "no";
    if (
      !dateIsValid ||
      !availableSpotsIsValid ||
      !destinationIsValid ||
      !pickupLocationIsValid ||
      !priceIsValid ||
      !equipmentRoomIsValid
    ) {
      Alert.alert("Invalid Input, Please Re-enter");
    } else {
      try {
        const user = await getUserInfo(auth.currentUser.uid);
        // console.log("my infor from postdetail", user);
        if (!user.name.firstname) {
          Alert.alert("Please Complete Your Profile First!");
          navigation.navigate("My Profile");
          return;
        }
        writeToDB(entryData);
        navigation.navigate("Home");
      } catch (err) {
        console.log(err);
      }
    }
  }

  function returnToPostHandler() {
    navigation.goBack();
  }

  function submitChangeHanlder() {
    const entryData = {
      category: postEntry.category,
      date: date,
      destination: postEntry.destination,
      pickupLocation: postEntry.pickupLocation,
      price: Number(postEntry.price),
      availableSpots: Number(postEntry.availableSpots),
      equipmentRoom: postEntry.equipmentRoom,
    };
    // console.log();
    const dateIsValid =
      new Date(entryData.date).valueOf() > new Date().valueOf();
    const availableSpotsIsValid =
      !isNaN(entryData.availableSpots) && entryData.availableSpots >= 1;
    const destinationIsValid = entryData.destination.trim().length > 0;
    const pickupLocationIsValid = entryData.pickupLocation.trim().length > 0;
    const priceIsValid = !isNaN(entryData.price);
    const equipmentRoomIsValid =
      entryData.equipmentRoom === "yes" || entryData.equipmentRoom === "no";

    if (
      !dateIsValid ||
      !availableSpotsIsValid ||
      !destinationIsValid ||
      !pickupLocationIsValid ||
      !priceIsValid ||
      !equipmentRoomIsValid
    ) {
      Alert.alert("Invalid Input, Please Re-enter");
    } else {
      console.log("post:", entryData);
      updateDB(post.id, entryData);
      navigation.navigate("Home");
    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <IconButton
            name="close-circle-outline"
            size={18}
            onPress={returnToPostHandler}
          />
          <View style={styles.Card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {post.category === "driver" ? (
                  <Text>Add Driver Post</Text>
                ) : (
                  <Text>Add Passenger Post</Text>
                )}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Date"
                timePicker={true}
                textInputConfig={{
                  date: date,
                  setDate: setDate,
                }}
              />
              <Input
                label="Destination"
                locationInput={true}
                textInputConfig={{
                  onChangeText: (text) => {
                    setPostEntry({ ...postEntry, destination: text });
                  },
                  value: postEntry.destination,
                }}
              />
              <Input
                label="Pick Up Location"
                locationInput={true}
                textInputConfig={{
                  onChangeText: (text) => {
                    setPostEntry({ ...postEntry, pickupLocation: text });
                  },
                  value: postEntry.pickupLocation,
                }}
              />
              {post.category === "driver" && (
                <Input
                  label="Price per Person"
                  inputBox={true}
                  textInputConfig={{
                    keybordType: "decimal-pad",
                    onChangeText: (price) => {
                      setPostEntry({ ...postEntry, price: price });
                    },
                    value: parseInt(postEntry.price),
                  }}
                />
              )}
              <Input
                label={
                  post.category === "driver"
                    ? "Spots Available"
                    : "Seats Needed"
                }
                inputBox={true}
                textInputConfig={{
                  keybordType: "numeric",
                  onChangeText: (spot) => {
                    setPostEntry({ ...postEntry, availableSpots: spot });
                  },
                  value: parseInt(postEntry.availableSpots),
                }}
              />
              <Input
                label={
                  post.category === "driver"
                    ? "Room for Equipment"
                    : "Need Room for Equipment"
                }
                optionBox={true}
                textInputConfig={{
                  onSelect: (option) => {
                    setPostEntry({ ...postEntry, equipmentRoom: option });
                  },
                  value: postEntry.equipmentRoom,
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={resetFormHandler} style={styles.buttonStyle}>
                Reset
              </Button>
              {post.id ? (
                <Button
                  onPress={submitChangeHanlder}
                  style={styles.buttonStyle}
                >
                  Submit Change
                </Button>
              ) : (
                <Button onPress={submitFormHanlder} style={styles.buttonStyle}>
                  Submit
                </Button>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 40,
    backgroundColor: Colors.primary100,
    // justifyContent: "space-evenly",
    alignItems: "flex-end",
    borderRadius: 8,
  },
  Card: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  inputContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
  },
});
