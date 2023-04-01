import { View, Text, Modal, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Colors } from "../../../Constants/colors";

import Input from "./Input";
import IconButton from "../../UI/IconButton";
import Button from "../../UI/Button";

import { writeToDB } from "../../../FireBase/firebase-helper";
import { updateDB } from "../../../FireBase/firebase-helper";

// Add form
export default function PostForm({ route, navigation }) {
  const post = route.params;
  const [postEntry, setPostEntry] = useState({
    category: post.category ? post.category : "",
    date: post.date ? post.date : "",
    destination: post.destination ? post.destination : "",
    pickupLocation: post.pickupLocation ? post.pickupLocation : "",
    price: post.price ? +post.price : 0,
    availableSpots: post.availableSpots ? +post.availableSpots : 0,
    equipmentRoom: post.equipmentRoom ? "yes" : "no",
  });

  function entryInputHandler(inputIdentifier, enteredValue) {
    setPostEntry((currValue) => {
      return {
        ...currValue,
        [inputIdentifier]: enteredValue,
      };
    });
  }

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

  function submitFormHanlder() {
    // const dataIsValid = !postEntry.date === "";
    const availableSpotsIsValid =
      !isNaN(postEntry.availableSpots) && postEntry.availableSpots >= 1;
    const destinationIsValid = postEntry.destination.trim().length > 0;
    const pickupLocationIsValid = postEntry.pickupLocation.trim().length > 0;
    const priceIsValid = !isNaN(postEntry.price);
    const equipmentRoomIsValid =
      postEntry.equipmentRoom === "yes" || postEntry.equipmentRoom === "no";

    if (
      !availableSpotsIsValid ||
      !destinationIsValid ||
      !pickupLocationIsValid ||
      !priceIsValid ||
      !equipmentRoomIsValid
    ) {
      Alert.alert("Invalid Input, Please Re-enter");
    } else {
      writeToDB(postEntry);
      navigation.goBack();
    }
  }

  function returnToPostHandler() {
    navigation.replace("UserPosts");
  }

  function submitChangeHanlder() {
    updateDB(post.id, postEntry);
    navigation.replace("UserPosts");
  }

  return (
    <Modal animationType="slide">
      <View style={styles.Card}>
        <IconButton
          name="close-circle-outline"
          size={18}
          onPress={returnToPostHandler}
        />
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {post.category === "driver" ? (
                <Text>Add Driver Post</Text>
              ) : (
                <Text>Add Passenger Post</Text>
              )}
            </Text>
          </View>
          <View>
            <Input
              label="Date"
              timePicker={true}
              textInputConfig={{
                date: postEntry.date,
                mode: "datetime",
                format: "YYYY-MM-DD @HH:mm",
                onDateChange: entryInputHandler.bind(this, "date"),
                useNativeDriver: true,
                value: postEntry.date,
              }}
            />
            <Input
              label="Destination"
              inputBox={true}
              textInputConfig={{
                onChangeText: entryInputHandler.bind(this, "destination"),
                value: postEntry.destination,
              }}
            />
            <Input
              label="Pick Up Location"
              inputBox={true}
              textInputConfig={{
                onChangeText: entryInputHandler.bind(this, "pickupLocation"),
                value: postEntry.pickupLocation,
              }}
            />
            {post.category === "driver" && (
              <Input
                label="Price per Person"
                inputBox={true}
                textInputConfig={{
                  keybordType: "decimal-pad",
                  onChangeText: entryInputHandler.bind(this, "price"),
                  value: postEntry.price,
                }}
              />
            )}
            <Input
              label={
                post.category === "driver" ? "Spots Available" : "Seats Needed"
              }
              inputBox={true}
              textInputConfig={{
                keybordType: "numeric",
                onChangeText: entryInputHandler.bind(this, "availableSpots"),
                value: postEntry.availableSpots,
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
                onSelect: entryInputHandler.bind(this, "equipmentRoom"),
                value: postEntry.equipmentRoom,
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={resetFormHandler} style={styles.buttonStyle}>
              Reset
            </Button>
            {post.id ? (
              <Button onPress={submitChangeHanlder} style={styles.buttonStyle}>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  Card: {
    marginHorizontal: 30,
    marginVertical: 100,
    backgroundColor: Colors.primary100,
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  contentContainer: {},

  titleContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  buttonStyle: {
    width: 100,
  },
});
