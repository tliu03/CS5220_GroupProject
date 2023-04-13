import React, { useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Button from "../../UI/Button";
import { Colors } from "../../../Constants/colors";

export default function Map({ navigation, route }) {
  const [markerTitle, setMarkerTitle] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <>
      <View>
        <MapView style={styles.map} onPress={handleMapPress}>
          <Marker
            coordinate={selectedLocation}
            title="Marker Title"
            description="Marker Description"
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
          />
        </MapView>
        <Text style={styles.markerTitle}>{markerTitle}</Text>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
        >
          Confirm Picker Location
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: 300,
    height: 300,
    marginVertical: 10,
    backgroundColor: Colors.secondary100,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "60%",
  },
  markerTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
