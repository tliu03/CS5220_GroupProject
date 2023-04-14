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

  

  function locationSelectHandler() {
    // navigate to Map.js
    if (location) {
      navigation.navigate("Map", { currentLocation: location });
      // console.log("navigate map");
    } else {
      navigation.navigate("Map");
    }
  }

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
