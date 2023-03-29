import { View, Text, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../../Constants/colors";

import Input from "./Input";
import IconButton from "../UI/IconButton";
import Button from "../UI/Button";

// Add form
export default function PostForm({
  modalIsVisible,
  driverPost,
  setModalVisibile,
}) {
  const [postEntry, setPostEntry] = useState({});

  // if (driverPost) {
  //   setPostEntry({
  //     category: "driver",
  //     date: new Date(),
  //     destination: "",
  //     pickupLocation: "",
  //     price: 0,
  //     spotsAvailable: 0,
  //     roomForEquipments: true,
  //   });
  // } else {
  //   setPostEntry({
  //     category: "passenger",
  //     date: new Date(),
  //     destination: "",
  //     pickupLocation: "",
  //     spotsNeeded: 0,
  //     needRoomForEquipment: true,
  //   });
  // }

  function resetFormHandler() {
    console.log("reset");
  }

  function submitFormHanlder() {
    console.log("submit");
  }

  const DriverInputForm = (
    <>
      <Input label="Date" />
      <Input label="Destination" />
      <Input label="Pick Up Location" />
      <Input label="Price" />
      <Input label="Spots" />
      <Input label="Room for Equipment" />
    </>
  );

  const PassengerInputForm = (
    <View>
      <Text style={styles.title}>Passenger Post</Text>
      <Input label="Driver" />
    </View>
  );

  function returnToPostHandler() {
    setModalVisibile(false);
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
            <Text style={styles.title}>Driver Post</Text>
          </View>
          <View>{driverPost ? DriverInputForm : PassengerInputForm}</View>
          <View style={styles.buttonContainer}>
            <Button onPress={resetFormHandler}>Reset</Button>
            <Button onPress={submitFormHanlder}>Submit</Button>
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
});
