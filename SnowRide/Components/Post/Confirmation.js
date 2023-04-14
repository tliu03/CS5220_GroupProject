import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "./ManageEntry/Input";
import Button from "../UI/Button";
import { auth } from "../../FireBase/firebase-setup";
import { updateDB, writeToDBBooking } from "../../FireBase/firebase-helper";
import { useState } from "react";
import { sendPushNotificationBooking } from "../Notification/NotificationManager";

export default function Confirmation({ route, navigation }) {
  const [seatNeeded, setSeatNeeded] = useState();

  function seatHandler(current) {
    // console.log(current);
    return setSeatNeeded(current);
  }

  let post = route.params;
  // console.log("booking cofirm", {
  //   ...post,
  //   postBookedBy: auth.currentUser.uid,
  // });

  async function ConfirmBookingHandler() {
    // console.log(post.availableSpots);
    // console.log(seatNeeded);
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

    await writeToDBBooking({
      postId: post.id,
      postPostedBy: post.user,
      bookedSpot: seatNeeded,
      postBookedBy: auth.currentUser.uid,
      bookedByUserfirstname: post.bookedByUserfirstname,
    });
    await updateDB(post.id, {
      ...post,
      availableSpots: post.availableSpots - seatNeeded,
    });
    // set up notification here: 1) notify the post_owner, there's a booking;
    await sendPushNotificationBooking(
      {
        postId: post.id,
        postPostedBy: post.user,
        bookedSpot: seatNeeded,
        postBookedBy: auth.currentUser.uid,
        bookedByUserfirstname: post.bookedByUserfirstname,
      },
      route.params.pushToken
    );
    navigation.navigate("My Bookings");
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
