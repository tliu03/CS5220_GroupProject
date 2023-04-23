import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Colors } from "../../../Constants/colors";
import Button from "../../UI/Button";
import OptionPicker from "./OptionPicker";
import DatetimePicker from "./DatetimePicker";

export default function Input({
  label,
  style,
  textInputConfig,
  inputBox,
  locationInput,
  optionBox,
  timePicker,
}) {
  let inputStyle = [styles.inputTextBox];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  // <DatePicker
  //   style={inputStyle}
  //   customStyles={styles.customStyles}
  //   {...textInputConfig}
  // />
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}: </Text>
        {inputBox && <TextInput style={inputStyle} {...textInputConfig} />}

        {optionBox && <OptionPicker style={inputStyle} {...textInputConfig} />}
        {timePicker && <DatetimePicker {...textInputConfig} />}
        {locationInput && (
          <>
            <View style={[inputStyle, styles.location]}>
              <TextInput {...textInputConfig} style={{ flex: 4 }} />
              {/* <LocationPicker style={{ flex: 1 }} /> */}
            </View>
          </>
        )}
      </View>
    </>
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
    height: "auto",
    minHeight: 36,
    borderRadius: 5,
    padding: 2,
    fontSize: 14,
    textAlignVertical: "top",
    overflow: "hidden",
  },
  inputMultiline: {
    minHeight: 200,
  },
  customStyles: {
    dateText: {
      fontSize: 13,
      color: "#333",
      marginHorizontal: 0,
    },
  },

  location: {
    flexDirection: "row",
  },
});
