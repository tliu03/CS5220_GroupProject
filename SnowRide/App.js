import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Welcome from "./Screens/Welcome";
import ChatBox from "./Screens/ChatBox";
import ChatWindow from "./Components/Chat/ChatWindow";
import DriverPost from "./Screens/DriverPost";
import PassengerPost from "./Screens/PassengerPost";
// import PostOverview from "./Routes/homeStack";
import LoginScreen from "./Components/User/Login";
import SignUpScreen from "./Components/User/SignUp";
import UserPost from "./Components/User/UserPost";
import UserProfile from "./Components/User/UserProfile";
import PostForm from "./Components/Post/ManageEntry/PostForm";
import Confirmation from "./Components/Post/Confirmation";
import Map from "./Components/Post/ManageEntry/Map";
import { Colors } from "./Constants/colors";
import PostDetail from "./Components/Post/PostDetail/PostDetail";
import EditProfile from "./Screens/EditProfile";
import { registerForPushNotificationsAsync } from "./Components/Notification/NotificationManager";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

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

function AppDrawer() {
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
              navigation.navigate("Messages");
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
      <Drawer.Screen name="My Bookings" component={UserPost} />
    </Drawer.Navigator>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App({ navigation }) {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener();

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={Welcome}
          />
          <Stack.Screen name="PostDetails" component={PostDetail} />
          <Stack.Screen name="ConfrimBook" component={Confirmation} />
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
          <Stack.Screen
            name="Home"
            component={AppDrawer}
            options={{ headerShown: false }}
          />

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
          <Stack.Screen name="Messages" component={ChatBox} />
          <Stack.Screen name="ChatWindow" component={ChatWindow} />
          <Stack.Screen
            name="Map"
            component={Map}
            // options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
