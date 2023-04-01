import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Colors } from "../../../Constants/colors";
import Button from "../../UI/Button";
import OptionPicker from "./OptionPicker";
import DatePicker from "react-native-datepicker";

export default function Input({
  label,
  style,
  textInputConfig,
  inputBox,
  optionBox,
  timePicker,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}: </Text>
      {inputBox && (
        <TextInput style={styles.inputTextBox} {...textInputConfig} />
      )}
      {optionBox && (
        <OptionPicker style={styles.pickerContainer} {...textInputConfig} />
      )}
      {timePicker && (
        <DatePicker style={styles.pickerContainer} {...textInputConfig} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    color: "black",
    width: "40%",
  },
  inputTextBox: {
    backgroundColor: "white",
    width: "70%",
    height: 30,
    borderRadius: 5,
    padding: 6,
    fontSize: 16,
    textAlignVertical: "top",
  },
  inputMultiline: {
    minHeight: 200,
  },
  pickerContainer: {
    backgroundColor: "white",
    width: "70%",
    height: 30,
  },
});
