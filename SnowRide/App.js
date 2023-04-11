import { StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import Navigator from "./Routes/userDrawer";

import Welcome from "./Screens/Welcome";
import User from "./Screens/User";
import ChatBox from "./Screens/ChatList";

import PostOverview from "./Routes/homeStack";
import LoginScreen from "./Components/User/Login";
import SignUpScreen from "./Components/User/SignUp";
import UserPost from "./Components/User/UserPost";
import UserProfile from "./Components/User/UserProfile";
import PostForm from "./Components/Post/ManageEntry/PostForm";

import { Colors } from "./Constants/colors";
import PostDetail from "./Components/Post/PostDetail/PostDetail";
import EditProfile from "./Screens/EditProfile";
import RootDrawerNavigator from "./Routes/userDrawer";

export default function App() {
  const Stack = createNativeStackNavigator();
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
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="UserDrawer" component={RootDrawerNavigator} />


          <Stack.Screen
            name="AddPost"
            component={PostForm}
            options={{ headerShown: false }}
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
