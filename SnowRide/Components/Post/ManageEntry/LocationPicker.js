import { View, Image, Modal, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../Constants/colors";
import Button from "../../UI/Button";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";

export default function LocationPicker({ locationSelectHandler }) {
  const navigation = useNavigation();
  const route = useRoute();

  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  // useEffect(() => {
  //   if (route.params) {
  //     setLocation(route.params.selectedLocation);
  //   }
  // }, [route]);
  // async function verifyPermission() {
  //   if (permissionResponse.granted) {
  //     return true;
  //   }
  //   try {
  //     const permissionResult = await requestPermission();
  //     return permissionResult.granted;
  //   } catch (err) {
  //     console.log("permission request error ", err);
  //   }
  // }
  // async function locateUserHandler() {
  //   const hasPermission = await verifyPermission();
  //   if (!hasPermission) {
  //     Alert.alert("You need to give access to the location services");
  //     return;
  //   }
  //   try {
  //     const result = await Location.getCurrentPositionAsync();
  //     console.log(result);
  //     setLocation({
  //       latitude: result.coords.latitude,
  //       longitude: result.coords.longitude,
  //     });
  //     // call new function to get address
  //     getAddress(result.coords.latitude, result.coords.longitude);
  //   } catch (err) {
  //     console.log("locate user error ", err);
  //   }
  // }

  function locationSelectHandler() {
    // navigate to Map.js
    if (location) {
      navigation.navigate("Map", { currentLocation: location });
      // console.log("navigate map");
    } else {
      navigation.navigate("Map");
    }
  }
  // console.log("rendered");

  // async function getAddress(latitude, longitude) {
  //   // new function to get address
  //   try {
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     setAddress(data.results[0].formatted_address);
  //   } catch (err) {
  //     console.log("get address error ", err);
  //   }
  // }

  return (
    <View>
      <Ionicons
        name={"location-sharp"}
        size={22}
        onPress={locationSelectHandler}
      />
      {address && <Text>{address}</Text>}

      {/* {location && (
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
        }}
        style={{ width: "100%", height: 200 }}
      />
    )} */}
      {/* <Button title="Let me choose!" onPress={locationSelectHandler} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
