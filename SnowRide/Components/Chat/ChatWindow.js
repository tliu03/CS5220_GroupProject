import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../Post/ManageEntry/Input";
import { sendPushNotification } from "../Notification/NotificationManager";
import { writeToDBMessage } from "../../FireBase/firebase-helper";
import { Colors } from "../../Constants/colors";

export default function ChatWindow({ route, navigation }) {
  console.log(route.params.senderName);
  const replying = route.params.senderName;
  console.log(replying);
  const pushToken = route.params.pushToken;
  const [message, setMessage] = useState({
    senderName: replying ? route.params.receiverName : "",
    receiverName: replying ? route.params.senderName : route.params.receiver,
    subject: replying ? `Replying to Message ${route.params.subject}` : "",
    detail: "",
    sender: replying ? route.params.ReceiverId : route.params.SenderId,
    receiver: replying ? route.params.SenderId : route.params.ReceiverId,
    replyingToMessage: replying ? route.params.id : "",
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
    const senderNameIsValid = message.senderName.trim().length > 0;
    const subjectIsValid = message.subject.trim().length > 0;
    const messageDetailIsValid = message.detail.trim().length > 0;
    if (!senderNameIsValid || !subjectIsValid || messageDetailIsValid) {
      Alert.alert("Please Enter Valid Information");
      return;
    }
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
