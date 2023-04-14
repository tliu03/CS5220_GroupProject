import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import MessagesList from "../Components/Chat/MessagesList";
import { onSnapshot, collection, query, where, and } from "firebase/firestore";
import { auth, firestore } from "../FireBase/firebase-setup";
import { Colors } from "../Constants/colors";

export default function ChatBox() {
  // Fetch Message Received
  const [messagesReceived, setMessagesReceived] = useState({});
  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      where("receiver", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setMessagesReceived([]);
        // console.log("empty");
      } else {
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          // console.log(snap.id);
          docs.push({ ...snap.data(), id: snap.id });
        });
        // console.log(docs);
        setMessagesReceived(docs);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Fetch Message Sent
  const [messagesSent, setMessagesSent] = useState({});
  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      where("sender", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setMessagesSent([]);
        // console.log("empty");
      } else {
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          // console.log(snap.id);
          docs.push({ ...snap.data(), id: snap.id });
        });
        // console.log(docs);
        setMessagesSent(docs);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerReceived}>
        <Text style={styles.label}>Received: </Text>
        <MessagesList messages={messagesReceived} />
      </View>
      <View style={styles.containerSent}>
        <Text style={styles.label}>Sent: </Text>
        <MessagesList messages={messagesSent} myMessage={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  containerReceived: {
    flex: 1,
    backgroundColor: Colors.secondary100,
    padding: 6,
  },
  containerSent: {
    flex: 1,
    backgroundColor: Colors.primary100,
    padding: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
