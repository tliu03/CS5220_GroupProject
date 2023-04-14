import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Colors } from "../../../Constants/colors";
import Button from "../../UI/Button";
import { deleteFromDB } from "../../../FireBase/firebase-helper";
import { auth } from "../../../FireBase/firebase-setup";

// post item detail
export default function PostDetail({ route, navigation }) {
  const post = route.params;

  function bookConfirmationHandler() {
    navigation.navigate("ConfrimBook", post);
  }

  function initialChatHandler() {
    navigation.navigate("ChatWindow", {
      ReceiverId: post.user,
      SenderId: auth.currentUser.uid,
    });
  }

  function EditPostHandler() {
    navigation.navigate("AddPost", post);
  }

  function DeletePostHandler() {
    deleteFromDB(post.id);
    navigation.navigate("UserPosts");
  }

  let PostItemView, myPostView;
  myPostView = (
    <>
      <View style={styles.buttonContainer}>
        <Button onPress={EditPostHandler} style={styles.buttonStyle}>
          Edit
        </Button>
        <Button onPress={DeletePostHandler} style={styles.buttonStyle}>
          Delete
        </Button>
      </View>
    </>
  );

  if (post.category === "driver") {
    PostItemView = (
      <View>
        <Text>Destination: {post.destination}</Text>
        <Text>Pick Up Location: {post.pickupLocation}</Text>
        <Text>Date: {post.date}</Text>
        <Text>
          Spots: {post.availableSpots}{" "}
          {post.availableSpots === 1 ? <Text>seat</Text> : <Text>seats</Text>}
        </Text>
        <Text>Price per Person: ${post.price}</Text>
        <Text>
          Room for Equipments:{" "}
          {post.equipmentRoom ? <Text>Yes</Text> : <Text>No</Text>}
        </Text>
        {auth.currentUser.uid === post.user ? (
          myPostView
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              onPress={bookConfirmationHandler}
              style={styles.buttonStyle}
            >
              Book
            </Button>
            <Button onPress={initialChatHandler} style={styles.buttonStyle}>
              Chat with Driver
            </Button>
          </View>
        )}
      </View>
    );
  } else {
    PostItemView = (
      <View>
        <Text>Destination: {post.destination}</Text>
        <Text>Pick Up Location: {post.pickupLocation}</Text>
        <Text>Date: {post.date}</Text>
        <Text>Seat/s Needed: {post.availableSpots}</Text>
        <Text>
          Need Room for Equipments:{" "}
          {post.equipmentRoom ? <Text>Yes</Text> : <Text>No</Text>}
        </Text>
        {auth.currentUser.uid === post.user ? (
          myPostView
        ) : (
          <View style={styles.buttonPassengerContainer}>
            <Button
              onPress={initialChatHandler}
              style={styles.buttonPassengerStyle}
            >
              Chat with Passenger
            </Button>
          </View>
        )}
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
  buttonPassengerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonPassengerStyle: {
    width: 200,
    height: 50,
    justifyContent: "center",
  },
});
