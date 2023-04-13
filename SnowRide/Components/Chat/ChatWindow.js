import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../Post/ManageEntry/Input";

export default function ChatWindow() {
  const [message, setMessage] = useState({
    detail: "",
    sender: "",
    receiver: "",
  });
  
  function entryInputHandler(inputIdentifier, enteredValue) {
    setMessage((currValue) => {
      return {
        ...currValue,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitMessageHandler(){
    
  }
  return (
    <View>
      <Text>ChatWindow</Text>
      <Input
        label="Message"
        inputBox={true}
        textInputConfig={{
          multiline: true,
          onChangeText: entryInputHandler.bind(this, "detail"),
          value: message.detail,
        }}
      />
      <Button onPress={submitMessageHandler}>Submit</Button>
    </View>
  );
}

const styles = StyleSheet.create({});
