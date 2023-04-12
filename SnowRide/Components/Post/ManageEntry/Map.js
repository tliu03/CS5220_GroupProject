import { Button, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { MAPS_API_KEY } from "@env";

export default function Map({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      getAddress(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation]);
  // console.log(route.params);
  async function getAddress(latitude, longitude) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`
      );
      const data = await response.json();
      setAddress(data.results[0].formatted_address);
    } catch (err) {
      console.log("get address error ", err);
    }
  }
  return (
    <>
      <MapView
        onPress={(event) => {
          setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
          console.log(event.nativeEvent.coordinate);
        }}
        style={styles.container}
        initialRegion={{
          latitude: route.params
            ? route.params.currentLocation.latitude
            : 37.78825,
          longitude: route.params
            ? route.params.currentLocation.longitude
            : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* {route.params && <Marker coordinate={route.params.currentLocation} />} */}
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <Button
        title="confirm selected location"
        disabled={!selectedLocation}
        onPress={() => {
          navigation.navigate("AddPost", {
            selectedLocation: selectedLocation,
            address: address,
          });
        }}
      />
      {address && <Text>{address}</Text>}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
