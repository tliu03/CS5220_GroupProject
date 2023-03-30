import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../../Constants/colors";

const OptionPicker = ({ style, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={[style, styles.container]}>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === "yes" && styles.selectedOptionButton,
        ]}
        onPress={() => handleOptionPress("yes")}
      >
        <Text
          style={[
            styles.optionText,
            selectedOption === "yes" && styles.selectedOptionText,
          ]}
        >
          Yes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === "no" && styles.selectedOptionButton,
        ]}
        onPress={() => handleOptionPress("no")}
      >
        <Text
          style={[
            styles.optionText,
            selectedOption === "no" && styles.selectedOptionText,
          ]}
        >
          No
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around",
    // borderRadius: 10,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  optionButton: {
    backgroundColor: Colors.secondary100,
    paddingHorizontal: 20,
    justifyContent: "center",
    // paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  selectedOptionButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  selectedOptionText: {
    color: "#fff",
  },
});

export default OptionPicker;
