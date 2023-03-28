import { View, Text, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { Colors } from "../../Constants/colors";

// Add form
export default function PostForm({ modalIsVisible, driverPost }) {
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

  const DriverInputForm = (
    <View style={styles.inputCard}>
      <Text style={styles.title}>Driver Post</Text>
      <Input label="Date" />
      <Input label="Destination" />
      <Input label="Pick Up Location" />
      <Input label="Price" />
      <Input label="Spots" />
      <Input label="Room for Equipment" />
    </View>
  );

  const PassengerInputForm = (
    <View style={styles.inputCard}>
      <Text style={styles.title}>Passenger Post</Text>
      <Input label="Driver" />
    </View>
  );
  return (
    <Modal visible={modalIsVisible} animationType="slide">
      {driverPost ? DriverInputForm : PassengerInputForm}
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputCard: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 100,
    backgroundColor: Colors.primary100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
