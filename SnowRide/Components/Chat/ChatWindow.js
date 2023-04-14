import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../Post/ManageEntry/Input";
import { sendPushNotification } from "../Notification/NotificationManager";
import { writeToDBMessage } from "../../FireBase/firebase-helper";
import { Colors } from "../../Constants/colors";

export default function ChatWindow({ route, navigation }) {
  const pushToken = route.params.pushToken;
  // console.log(pushToken);
  const [message, setMessage] = useState({
    senderName: "",
    receiverName: route.params.receiver,
    subject: "",
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
    try {
      console.log("Send Message");
      writeToDBMessage(message);
      await sendPushNotification(message, pushToken);
      navigation.replace("ChatBox");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Message</Text>
      <Input
        label="Your Name"
        inputBox={true}
        textInputConfig={{
          onChangeText: entryInputHandler.bind(this, "senderName"),
          value: message.senderName,
        }}
      />
      <Input
        label="Subject"
        inputBox={true}
        textInputConfig={{
          onChangeText: entryInputHandler.bind(this, "subject"),
          value: message.subject,
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
