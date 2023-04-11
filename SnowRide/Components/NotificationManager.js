import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
  async function scheduleNotificationHandler() {
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
    const permissionResponse = Notifications.getPermissionsAsync();
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
  return (
    <View>
      <Text>NotificationManager</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
