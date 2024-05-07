import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const ActivityCamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      const imagePickerStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const handleCameraTypeToggle = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate("Aktivitas", { savedPhoto: photo });
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <View />
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Text style={styles.cameraButtonText}>Capture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleCameraTypeToggle}
            >
              <Text style={styles.cameraButtonText}>
                {cameraType === Camera.Constants.Type.back
                  ? "Kamera Depan"
                  : "Kamera belakang"}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  cameraButton: {
    backgroundColor: "#44B6C7",
    padding: 15,
    borderRadius: 10,
  },
  cameraButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
  imagePreviewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ActivityCamera;
