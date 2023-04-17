import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LocationPicker from "./LocationPicker";
import { Geocoding } from "react-native-geocoding";

export default function Weather() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [showWeather, setShowWeather] = useState(false);
  const [address, setAddress] = useState("");

  const API_KEY = "e2cd80c212ded42a959ead9ac05b10a8";
  const API_KEY_GOOGLE_MAP = "AIzaSyAv431WgxUsHLvw2EUqp52AUcLE8n1rdaA";
  //   console.log(weatherData);
  //   Geocoding.init("your_api_key_here");

  function checkWeatherHandler() {
    console.log(location);
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude={minutely
}&appid=${API_KEY}&units={metric}`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (weatherData) {
      setShowWeather(true);
      //   Geocoding.from(location)
      //     .then((response) => {
      //       const address = response.results[0].formatted_address;
      //       setAddress(address);
      //     })
      //     .catch((error) => console.log(error));
    } else {
      setShowWeather(false);
    }
  }, [weatherData]);

  return (
    <View style={styles.container}>
      <LocationPicker
        location={location}
        setLocation={setLocation}
        setShowWeather={setShowWeather}
        checkWeather={checkWeatherHandler}
      />
      {weatherData ? (
        <>
          <Text style={styles.title}>{address}</Text>
          <Text style={styles.subtitle}>
            Current Weather: <Text>Temp: {weatherData.current.temp} C</Text>;
            <Text>Feels Like: {weatherData.current.temp}; </Text>
            <Text>
              UV Index:
              {weatherData.current.uvi};
            </Text>
            <Text>Visibility: {weatherData.current.visibility}</Text>;{" "}
            <Text>Wind Speed: {weatherData.current.wind_speed}; </Text>
            <Text>Snow: {weatherData.current.snow}</Text>
          </Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    marginTop: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 20,
  },
});
