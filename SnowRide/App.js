import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DriverPost from "./Screens/DriverPost";
import PassengerPost from "./Screens/PassengerPost";
import Welcome from "./Screens/Welcome";
import User from "./Screens/User";
import ChatBox from "./Screens/ChatBox";

import {
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

function PostOverview() {
  const BottomTabs = createBottomTabNavigator();
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerTintColor: Colors.tertiary100,
        headerStyle: { backgroundColor: Colors.primary200 },
        tabBarStyle: { backgroundColor: Colors.primary200 },
        tabBarActiveTintColor: Colors.primary201,
        tabBarInactiveTintColor: Colors.secondary100,
        headerRight: ({ tintColor }) => (
          <Ionicons
            name="chatbox-ellipses-outline"
            size={22}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Messages");
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <SimpleLineIcons
            name="user"
            size={22}
            color={tintColor}
            onPress={() => {
              navigation.navigate("User");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Driver Posts"
        component={DriverPost}
        options={{
          tabBarLabel: "DriverPosts",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="car" size={size} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="Passenger Posts"
        component={PassengerPost}
        options={{
          tabBarLabel: "PassengerPosts",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="car-seat"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <NavigationContainer
        screenOptions={{
          headerStyle: { backgroundColor: Colors.secondary100 },
          headerTintColor: Colors.tertiary100,
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Posts"
            component={PostOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Messages" component={ChatBox} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
