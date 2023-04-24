import {
  View,
  Image,
  Modal,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Constants/colors";
import Button from "../UI/Button";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";

export default function LocationPicker({
  location,
  setLocation,
  setShowWeather,
  checkWeather,
}) {
  const [markerTitle, setMarkerTitle] = useState();

  const [showMap, setShowMap] = useState(false);

  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  const handleMapPress = (event) => {
    setLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  async function verifyPermission() {
    // console.log(permissionResponse);
    if (permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // // this will be user's choice:
    return permissionResult.granted;
  }
  async function locateUserHandler() {
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give location permission");
      return;
    }
    try {
      const result = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.log("location handler ", err);
    }
  }

  function checkWeatherHandler() {
    if (location) {
      checkWeather();
      // setShowWeather(true);
    } else {
      Alert.alert("Please Select a Location on the Map First!!");
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={locateUserHandler} style={styles.locateButton}>
        <Text>Locate Me</Text>
        <Ionicons name={"location-sharp"} size={22} />
      </Button>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} onPress={handleMapPress}>
          {location && (
            <Marker
              coordinate={location}
              title="Marker Title"
              description="Marker Description"
              initialRegion={{
                latitude: location ? location.latitude : 37.78825,
                longitude: location ? location.longitude : -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          )}
        </MapView>
        <Text style={styles.markerTitle}>{markerTitle}</Text>
        <Button onPress={checkWeatherHandler}>Check Weather</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.secondary100,
    // justifyContent: "center",
    alignItems: "center",
  },
  locateButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: 300,
  },
  markerTitle: {
    // marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
