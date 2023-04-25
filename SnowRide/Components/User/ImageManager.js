import { View, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../UI/Button";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ imageUriHandler }) {
  const [imageUri, setImageUri] = useState("");
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    if (permissionInfo.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  }

  const imageHandler = async () => {
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give camera permission");
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (result.assets.length) {
        let uri = result.assets[0].uri;
        console.log("uri from imageManage", uri);
        setImageUri(uri);
        imageUriHandler(uri);
      }
    } catch (err) {
      console.log("launch camera error ", err);
    }
  };

  return (
    <View>
      <Button onPress={imageHandler}>Take A Picture</Button>
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ height: 100, width: 100 }}
        />
      )}
    </View>
  );
}
