import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { onSnapshot, collection, query, where, doc } from "firebase/firestore";
import { firestore, auth } from "../../FireBase/firebase-setup";
import { getPostInfo } from "../../FireBase/firebase-helper";
import PostItem from "../Post/PostDetail/PostItem";

export default function UserBooking() {
  const [bookings, setBookings] = useState(null);
  console.log(auth.currentUser.uid);

  useEffect(() => {
    const q = query(
      collection(firestore, "bookings"),
      where("postBookedBy", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setBookings(null);
        // console.log("empty");
      } else {
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          // console.log(snap.id);
          docs.push({ ...snap.data(), id: snap.id });
        });
        // console.log(docs);
        setBookings(docs);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {bookings ? (
        <BookingList bookings={bookings} />
      ) : (
        <Text>No Booking's Yet, Please Make a Booking First!</Text>
      )}
    </View>
  );
}

function BookingList({ bookings }) {
  return (
    <View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Booking booking={item} />}
      />
    </View>
  );
}

function Booking({ booking }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, "posts", booking.postId),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setPost(null);
          // console.log("empty");
        } else {
          setPost(querySnapshot.data());
        }
      }
    );
    return () => {
      unsub();
    };
  }, []);

  console.log("post", post);
  return <>{post && <PostItem post={post} bookingHistory={true} />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
