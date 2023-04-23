import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import Messages from "./Messages";

export default function MessagesList({ messages, myMessage }) {
  // console.log("MessagesList", messages);
  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Messages message={item} myMessage={myMessage} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
