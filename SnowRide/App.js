import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Device from "expo-device";

import OnboardingScreen from "./Screens/OnboardingScreen";
import Welcome from "./Screens/Welcome";
import ChatBox from "./Screens/ChatBox";
import ChatWindow from "./Components/Chat/ChatWindow";
import DriverPost from "./Screens/DriverPost";
import PassengerPost from "./Screens/PassengerPost";

import LoginScreen from "./Components/User/Login";
import SignUpScreen from "./Components/User/SignUp";
import UserPost from "./Components/User/UserPost";
import UserProfile from "./Components/User/UserProfile";
import PostForm from "./Components/Post/ManageEntry/PostForm";
import Confirmation from "./Components/Post/Confirmation";
import Map from "./Components/Post/ManageEntry/Map";
import PostDetail from "./Components/Post/PostDetail/PostDetail";
import MessageDetail from "./Components/Chat/MessageDetail";
import UserBooking from "./Components/User/UserBooking";
import Weather from "./Components/API/Weather";
import EditProfile from "./Components/User/EditProfile";
import { Colors } from "./Constants/colors";

import { auth } from "./FireBase/firebase-setup";
import { onAuthStateChanged } from "firebase/auth";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const OnboardStack = createStackNavigator();

function BottomTab() {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        name="Driver Posts"
        component={DriverPost}
        options={{
          tabBarLabel: "Driver Posts",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="car" size={size} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="Passenger Posts"
        component={PassengerPost}
        options={{
          tabBarLabel: "Passenger Posts",
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

function AppDrawer({ navigation }) {
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          "response received",
          response.notification.request.content.data.url
        );
        navigation.navigate(response.notification.request.content.data.url);
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);
  return (
    <Drawer.Navigator
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
              navigation.navigate("ChatBox");
            }}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="SnowRides"
        component={BottomTab}
        options={{ headerShown: true }}
      />
      <Drawer.Screen name="My Profile" component={UserProfile} />
      <Drawer.Screen name="My Posts" component={UserPost} />
      <Drawer.Screen name="My Bookings" component={UserBooking} />
      <Drawer.Screen name="Weather" component={Weather} />
    </Drawer.Navigator>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true"); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  // console.log(auth);

  const AuthStack = (
    <>
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen
        name="LogIn"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={AppDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PostDetails" component={PostDetail} />
      <Stack.Screen name="ConfrimBook" component={Confirmation} />
      <Stack.Screen
        name="AddPost"
        component={PostForm}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: "Edit Your Profile",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.primary100,
            shadowColor: "#fff",
            elevation: 0,
          },
        }}
      />
      <Stack.Screen name="ChatBox" component={ChatBox} />
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
      <Stack.Screen name="MessageDetail" component={MessageDetail} />
      <Stack.Screen
        name="Map"
        component={Map}
        // options={{ headerShown: true }}
      />
    </>
  );

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    return (
      <NavigationContainer>
        <OnboardStack.Navigator screenOptions={{ headerShown: false }}>
          <OnboardStack.Screen name="Onboarding" component={OnboardingScreen} />
          <OnboardStack.Screen name="Login" component={LoginScreen} />
        </OnboardStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer
          screenOptions={{
            headerStyle: { backgroundColor: Colors.secondary100 },
            headerTintColor: Colors.tertiary100,
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary100 },
              headerTintColor: Colors.tertiary100,
            }}
          >
            {isAuthenticated ? AppStack : AuthStack}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
