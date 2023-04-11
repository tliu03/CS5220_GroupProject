import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import DriverPost from "../Screens/DriverPost";
import PassengerPost from "../Screens/PassengerPost";
import { Colors } from "../Constants/colors";

const BottomTabs = createBottomTabNavigator();

const PostOverview = ({ navigation }) => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerTintColor: Colors.tertiary100,
        headerStyle: { backgroundColor: Colors.primary100 },
        tabBarStyle: { backgroundColor: Colors.primary100 },
        tabBarActiveTintColor: Colors.tertiary100,
        tabBarInactiveTintColor: Colors.secondary200,
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

export default PostOverview;