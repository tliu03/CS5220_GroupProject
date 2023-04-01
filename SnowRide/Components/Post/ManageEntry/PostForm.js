import { View, Text, Modal, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Colors } from "../../../Constants/colors";

import Input from "./Input";
import IconButton from "../../UI/IconButton";
import Button from "../../UI/Button";

import { writeToDB } from "../../../FireBase/firebase-helper";

// import DateTimePick from "./DateTimePick";

// Add form
export default function PostForm({
  modalIsVisible,
  postType,
  setModalVisibile,
}) {
  const [postEntry, setPostEntry] = useState({
    category: "",
    date: null,
    destination: "",
    pickupLocation: "",
    price: 0,
    availableSpots: 0,
    equipmentRoom: true,
  });

  let driverPost;
  if (postType === "driver") {
    driverPost = true;
  }

  function entryInputHandler(inputIdentifier, enteredValue) {
    setPostEntry((currValue) => {
      // console.log(enteredValue);
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
    const entryPostData = {
      category: driverPost ? "driver" : "passenger",
      date: postEntry.date,
      destination: postEntry.destination,
      pickupLocation: postEntry.pickupLocation,
      price: +postEntry.price,
      availableSpots: +postEntry.availableSpots,
      equipmentRoom: postEntry.equipmentRoom === "yes" ? true : false,
    };
    const availableSpotsIsValid =
      !isNaN(entryPostData.availableSpots) && entryPostData.availableSpots >= 1;
    const destinationIsValid = entryPostData.destination.trim().length > 0;
    const pickupLocationIsValid =
      entryPostData.pickupLocation.trim().length > 0;
    const priceIsValid = !isNaN(entryPostData.price);
    const equipmentRoomIsValid =
      typeof entryPostData.equipmentRoom === "boolean";

    if (
      !availableSpotsIsValid ||
      !destinationIsValid ||
      !pickupLocationIsValid ||
      !priceIsValid ||
      !equipmentRoomIsValid
    ) {
      Alert.alert("Invalid Input, Please Re-enter");
    } else {
      writeToDB(entryPostData);
      returnToPostHandler();
    }
  }

  function returnToPostHandler() {
    setModalVisibile(false);
    setPostEntry({
      category: "driver",
      date: null,
      destination: "",
      pickupLocation: "",
      price: 0,
      availableSpots: 0,
      equipmentRoom: true,
    });
  }

  return (
    <Modal visible={modalIsVisible} animationType="slide">
      <View style={styles.Card}>
        <IconButton
          name="close-circle-outline"
          size={18}
          onPress={returnToPostHandler}
        />
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {driverPost ? (
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
            {driverPost && (
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
              label={driverPost ? "Spots Available" : "Seats Needed"}
              inputBox={true}
              textInputConfig={{
                keybordType: "numeric",
                onChangeText: entryInputHandler.bind(this, "availableSpots"),
                value: postEntry.availableSpots,
              }}
            />
            <Input
              label={
                driverPost ? "Room for Equipment" : "Need Room for Equipment"
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
            <Button onPress={submitFormHanlder} style={styles.buttonStyle}>
              Submit
            </Button>
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
