import { StyleSheet, Text, View, Alert } from "react-native";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function scheduleNotificationHandler() {
  const hasPermission = await verifyPermission();
  console.log(hasPermission);
  if (!hasPermission) {
    Alert.alert("You need to give notification permission");
  }
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey!",
        body: "First Notification.",
        data: { url: "https://google.com" },
      },
      trigger: { seconds: 5 },
    });
  } catch (err) {
    console.log(err);
  }
}

async function verifyPermission() {
  const permissionResponse = await Notifications.getPermissionsAsync();
  console.log(permissionResponse);
  if (permissionResponse.granted) {
    return true;
  } else {
    try {
      const permissionResult = await Notifications.requestPermissionsAsync();
      return permissionResult.granted;
    } catch (err) {
      console.log(err);
    }
  }
}

export async function registerForPushNotificationsAsync() {
  // verify permission first
  const hasPermission = await verifyPermission();
  if (!hasPermission) {
    Alert.alert("You must grand permission to receive booking notifications!!");
    return;
  }
  // get ExpoPushToken
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  if (Device.isDevice) {
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

async function sendPushNotification({ messageFrom, pushToken }) {
  const message = {
    to: pushToken,
    sound: "default",
    title: "New Booking",
    body: "You got a new booking!",
    data: { url: "Messages", message: `You got a message: ${messageFrom}` },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export default function NotificationManager() {
  const [expoPushToken, setExpoPushToken] = useState("");
  return (
    <View>
      <Text>NotificationManager</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
