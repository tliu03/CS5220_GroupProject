import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DriverPost from "./Screens/DriverPost";
import PassengerPost from "./Screens/PassengerPost";
import Welcome from "./Screens/Welcome";
import User from "./Screens/User";
import ChatBox from "./Screens/ChatList";

import LoginScreen from "./Components/User/Login";
import SignUpScreen from "./Components/User/SignUp";
import UserPost from "./Components/User/UserPost";
import PostForm from "./Components/Post/ManageEntry/PostForm";
// import AddPost from "./Screens/AddPost";

import {
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "./Constants/colors";
import PostDetail from "./Components/Post/PostDetail/PostDetail";

function PostOverview() {
  const BottomTabs = createBottomTabNavigator();
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
          <Stack.Screen
            name="Posts"
            component={PostOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PostDetails" component={PostDetail} />
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
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="UserPosts" component={UserPost} />
          <Stack.Screen
            name="AddPost"
            component={PostForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Messages" component={ChatBox} />
          {/* <Stack.Screen name="AddPost" component={AddPost} /> */}
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
