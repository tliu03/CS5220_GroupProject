import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "./ManageEntry/Input";
import Button from "../UI/Button";
import { auth } from "../../FireBase/firebase-setup";
import { updateDB, writeToDBBooking } from "../../FireBase/firebase-helper";
import { useState } from "react";

export default function Confirmation({ route, navigation }) {
  const [seatNeeded, setSeatNeeded] = useState(0);

  function seatHandler(current) {
    return setSeatNeeded(current);
  }

  let post = route.params;
  console.log("booking cofirm", post);
  async function ConfirmBookingHandler() {
    console.log(post.availableSpots);
    console.log(seatNeeded);
    if (auth.currentUser.uid === post.user) {
      Alert.alert("You Cannot Book Your Own Post!!! ");
      return;
    }
    if (seatNeeded > post.availableSpots || seatNeeded == 0) {
      Alert.alert(
        "Please re-enter a valid seat number or booking another driver!"
      );
      return;
    }
    await writeToDBBooking(post);
    await updateDB(post.id, {
      ...post,
      availableSpots: post.availableSpots - seatNeeded,
    });
    // console.log("booked successfully");
  }

  return (
    <View style={styles.container}>
      <Input
        label={"Seat Needed"}
        inputBox={true}
        textInputConfig={{
          keybordType: "numeric",
          onChangeText: seatHandler,
          value: seatNeeded,
        }}
      />
      <Button onPress={ConfirmBookingHandler}>Confirm</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
