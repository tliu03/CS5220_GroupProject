import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import { deleteFromDBMessage } from "../../FireBase/firebase-helper";
import { Colors } from "../../Constants/colors";

export default function MessageDetail({ route, navigation }) {
  console.log(route.params);

  function deleteMessageHandler() {
    deleteFromDBMessage(route.params.id);
    navigation.navigate("ChatBox");
  }

  function replyMessageHander() {
    navigation.navigate('ChatWindow', route.params)
  }
  return (
    <View style={styles.container}>
      <Text>MessageDetail</Text>
      <View style={styles.textContainer}>
        <Text>From: {route.params.senderName}</Text>
        <Text>To: {route.params.receiverName}</Text>
        <Text>Message Details: {route.params.detail}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={deleteMessageHandler}>Delete</Button>
        <Button onPress={replyMessageHander}>Reply</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Colors.secondary100,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  textContainer: {
    marginBottom: 50,
    alignItems: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
