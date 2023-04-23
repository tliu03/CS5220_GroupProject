import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "../../Constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function Messages({ message, myMessage }) {
  // console.log(message);
  const navigation = useNavigation();
  function clickIntoMessageHandler() {
    navigation.navigate("MessageDetail", message);
  }
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={clickIntoMessageHandler}
        >
          {myMessage ? (
            <Text>To: {message.receiverName}</Text>
          ) : (
            <Text>From: {message.senderName}</Text>
          )}
          <Text>Subject: {message.subject} </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary100,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 1,
    padding: 15,
  },
  pressed: {
    opacity: 0.75,
  },
});
