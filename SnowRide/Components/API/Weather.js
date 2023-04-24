import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import LocationPicker from "./LocationPicker";
import { Geocoding } from "react-native-geocoding";
import { Colors } from "../../Constants/colors";

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
}&appid=${API_KEY}&units=metric`)
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
    <ScrollView style={styles.page}>
      <View style={styles.container}>
        <LocationPicker
          location={location}
          setLocation={setLocation}
          setShowWeather={setShowWeather}
          checkWeather={checkWeatherHandler}
        />
        {weatherData ? (
          <View style={styles.weatherContainer}>
            {/* <Text style={styles.title}>{address}</Text> */}
            <View style={styles.TextContainer}>
              <Text style={styles.subtitle}>Current Weather:</Text>
              <Text>Temp: {weatherData.current.temp} Celsiu</Text>
              <Text>Feels Like: {weatherData.current.temp} Celsius</Text>
              <Text>
                UV Index:
                {weatherData.current.uvi}
              </Text>
              <Text>Visibility: {weatherData.current.visibility} metres</Text>
              <Text>
                Wind Speed: {weatherData.current.wind_speed} metre/sec{" "}
              </Text>
              {weatherData.current.snow && (
                <Text>Snow: {weatherData.current.snow} mm/h</Text>
              )}
              {weatherData.current.rain && (
                <Text>Snow: {weatherData.current.rain} mm/h</Text>
              )}
            </View>
            <View style={styles.TextContainer}>
              <Text style={styles.subtitle}>Today's Weather:</Text>
              <Text>Temp: {weatherData.daily.temp} Celsiu</Text>
              <Text>Feels Like: {weatherData.daily.temp} Celsius</Text>
              <Text>
                UV Index:
                {weatherData.current.uvi}
              </Text>
              <Text>Visibility: {weatherData.daily.visibility} metres</Text>
              <Text>Wind Speed: {weatherData.daily.wind_speed} metre/sec </Text>
              {weatherData.daily.snow && (
                <Text>Snow: {weatherData.daily.snow} mm/h</Text>
              )}
              {weatherData.daily.rain && (
                <Text>Snow: {weatherData.daily.rain} mm/h</Text>
              )}
            </View>
            {weatherData.alerts && (
              <View style={styles.TextContainer}>
                <Text>Alert: {weatherData.alerts.event}</Text>
                <Text>Start: {weatherData.alerts.start}</Text>
                <Text>End: {weatherData.alerts.end}</Text>
                <Text>Description:{weatherData.alerts.description} </Text>
                <Text>Tag: {weatherData.alerts.tags}</Text>
              </View>
            )}
          </View>
        ) : (
          <Text>Pick Your Location First...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.secondary100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    // alignItems: "center",
  },
  weatherContainer: {
    marginBottom: 100,
  },
  TextContainer: {},
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
