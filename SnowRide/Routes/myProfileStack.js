import { createStackNavigator } from "react-navigation-stack";
import UserProfile from "../Components/User/UserProfile";

const screens = {
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      title: "My Profile",
    }
  },
}

const myProfileStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee", height: 60 },
  },
});

export default myProfileStack;