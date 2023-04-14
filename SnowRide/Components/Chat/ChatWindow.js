import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../Post/ManageEntry/Input";
import { sendPushNotification } from "../Notification/NotificationManager";
import { writeToDBMessage } from "../../FireBase/firebase-helper";
import { Colors } from "../../Constants/colors";

export default function ChatWindow({ route }) {
  console.log(route);
  const [message, setMessage] = useState({
    name: "",
    detail: "",
    sender: route.params.SenderId,
    receiver: route.params.ReceiverId,
  });

  function entryInputHandler(inputIdentifier, enteredValue) {
    setMessage((currValue) => {
      return {
        ...currValue,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function submitMessageHandler() {
    console.log("Send Message");
    writeToDBMessage(message);
    // await sendPushNotification()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Message</Text>
      <Input
        label="Name"
        inputBox={true}
        textInputConfig={{
          onChangeText: entryInputHandler.bind(this, "name"),
          value: message.name,
        }}
      />
      <Input
        label="Message"
        inputBox={true}
        textInputConfig={{
          multiline: true,
          onChangeText: entryInputHandler.bind(this, "detail"),
          value: message.detail,
        }}
      />
      <Button style={styles.buttonStyle} onPress={submitMessageHandler}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 30,
    marginHorizontal: 10,
    backgroundColor: Colors.primary100,
    padding: 20,
    borderRadius: 13,
  },
  title: {
    fontSize: 18,
    marginVertical: 9,
  },
  buttonStyle: {
    width: "80%",
  },
});
