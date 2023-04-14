import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { onSnapshot, collection, query, where, and } from "firebase/firestore";
import { firestore, auth } from "../../FireBase/firebase-setup";
import { getPostInfo } from "../../FireBase/firebase-helper";
import PostItem from "../Post/PostDetail/PostItem";

export default function UserBooking() {
  const [bookings, setBookings] = useState();

  useEffect(() => {
    const q = query(
      collection(firestore, "bookings"),
      where("postBookedBy", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setBookings([]);
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
    <View>
      <Text>UserBookings</Text>
      <View>
        <BookingList bookings={bookings} />
      </View>
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
  let post;
  useLayoutEffect(() => {
    async function getPost() {
      post = await getPostInfo(booking.postId);
      console.log("post", post);
    }
    getPost();
  }, []);

  // console.log("booking", booking);
  // return <PostItem post={post} />;
}

const styles = StyleSheet.create({});
