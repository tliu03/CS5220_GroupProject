import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { windowHeight } from '../../Utils/dimentions';

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    height: windowHeight / 18,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
  },
});