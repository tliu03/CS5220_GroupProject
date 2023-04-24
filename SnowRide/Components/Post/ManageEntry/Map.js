import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Button from "../../UI/Button";
import { Colors } from "../../../Constants/colors";
import { MAPS_API_KEY } from "@env";

export default function Map({ navigation, route }) {
  return <></>;
}

const styles = StyleSheet.create({
  mapContainer: {
    width: 200,
    height: 300,
    marginVertical: 10,
    backgroundColor: Colors.secondary100,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "80%",
    height: "60%",
  },
  markerTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
