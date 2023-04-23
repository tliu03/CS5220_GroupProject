import { Image, View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({...props}) => (
  <Button
    title="Skip"
    color="#000"
    {...props}
  />
);

const Next = ({...props}) => (
  <Button
    title="Next"
    color="#000"
    {...props}
  />
);

const Done = ({...props}) => (
  <Button
    title="Done"
    color="#000"
    {...props}
  />
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/ob1.jpeg')} style={styles.obimg1} />,
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/ob3.jpeg')} style={styles.obimg2} />,
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  obimg1: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  obimg2: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});