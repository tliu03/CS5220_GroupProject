import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../../Constants/colors";
import Button from "../../UI/Button";

// post item detail
export default function PostDetail({ route }) {
  // console.log(route);
  const post = route.params;
  const date = post.date.toString();
  // console.log(post.pickupLocation);

  function boookConfirmationHandler() {
    console.log("book");
  }

  function initialChatHandler() {
    console.log("chat with driver");
  }

  let PostItemView;
  if (post.category === "driver") {
    PostItemView = (
      <View>
        <Text>Destination: {post.destination}</Text>
        <Text>Pick Up Location: {post.pickupLocation}</Text>
        <Text>Date: {date}</Text>
        <Text>Spots: {post.availableSpots} seat/s</Text>
        <Text>Price: ${post.price}</Text>
        <Text>
          Room for Equipments:{" "}
          {post.equipmentRoom ? <Text>Yes</Text> : <Text>No</Text>}
        </Text>
        <View style={styles.buttonContainer}>
          <Button onPress={boookConfirmationHandler} style={styles.buttonStyle}>
            Book
          </Button>
          <Button onPress={initialChatHandler} style={styles.buttonStyle}>
            Chat with Driver
          </Button>
        </View>
      </View>
    );
  } else {
    PostItemView = (
      <View>
        <Text>Destination: {post.destination}</Text>
        <Text>Pick Up Location: {post.pickupLocation}</Text>
        <Text>Date: {date}</Text>
        <Text>Seat/s Needed: {post.availableSpots} seat/s</Text>
        <Text>
          Need Room for Equipments:
          {post.equipmentRoom ? <Text>Yes</Text> : <Text>No</Text>}
        </Text>
      </View>
    );
  }

  function checkPostHanlder() {}
  return <View style={styles.container}>{PostItemView}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary100,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  buttonStyle: {
    width: 100,
    height: 50,
    justifyContent: "center",
  },
});
