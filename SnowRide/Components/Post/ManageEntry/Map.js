import { Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function Map({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  console.log(route.params);
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
        <Marker coordinate={selectedLocation} />
      </MapView>
      <Button
        title="confirm selected location"
        disabled={!selectedLocation}
        onPress={() => {
          navigation.navigate("DriverPost", {
            selectedLocation: selectedLocation,
          });
        }}
      />
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
