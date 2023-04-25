import { Button, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import IconButton from "../../UI/IconButton";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatetimePicker({ date, setDate, style }) {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  let ios, android;
  if (Platform.OS === "ios") {
    ios = true;
  } else {
    android = true;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={style}>
      {android && (
        <View>
          <View style={styles.timeButtonContainer}>
            <IconButton
              onPress={showDatepicker}
              name="calendar-outline"
              size={24}
            />
            <IconButton
              onPress={showTimepicker}
              name="time-outline"
              size={24}
            />
          </View>
          <Text>{date.toLocaleString()}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
      )}
      {ios && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timeButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
