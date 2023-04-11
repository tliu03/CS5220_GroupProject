import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import PostOverview from './homeStack';
import myProfileStack from './myProfileStack';


const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: PostOverview,
  },
  MyProfile: {
    screen: myProfileStack,
  }
});

export default createAppContainer(RootDrawerNavigator);

// const UserSideDrawer = createDrawerNavigator();

// export default function MyDrawer() {
//   return (
//     <UserSideDrawer.Navigator initialRouteName="Home">
//       <UserSideDrawer.Screen name="Home" component={PostOverview} />
//       <UserSideDrawer.Screen name="MyProfile" component={myProfileStack} />
//     </UserSideDrawer.Navigator>
//   );
// }