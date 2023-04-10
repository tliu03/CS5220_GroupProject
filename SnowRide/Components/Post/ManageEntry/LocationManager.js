// This function should allow user to either locate their current location
// or select location off a map when adding a new post // imported under PostForm

import { View, Image, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MAPS_API_KEY } from "@env";
export default function LocationManager() {
  const navigation = useNavigation();
  const route = useRoute();

  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (route.params) {
      setLocation(route.params.selectedLocation);
    }
  }, [route]);
  async function verifyPermission() {
    if (permissionResponse.granted) {
      return true;
    }
    try {
      const permissionResult = await requestPermission();
      return permissionResult.granted;
    } catch (err) {
      console.log("permission request error ", err);
    }
  }
  async function locateUserHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give access to the location services");
      return;
    }
    try {
      const result = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.log("locate user error ", err);
    }
  }
  function locationSelectHandler() {
    // navigate to Map.js
    if (location) {
      navigation.navigate("Map", { currentLocation: location });
    } else {
      navigation.navigate("Map");
    }
  }
  return (
    <View>
      <Button title="Locate Me!" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
          }}
          style={{ width: "100%", height: 200 }}
        />
      )}
      <Button title="Let me choose!" onPress={locationSelectHandler} />
    </View>
  );
}
