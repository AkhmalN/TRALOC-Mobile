import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const PatrolCamera = () => {
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
      navigation.navigate("Patroli", { savedPhoto: photo });
    }
  };

  const selectImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const processedPhoto = {
        uri: result.assets[0].uri,
        width: result.assets[0].width,
        height: result.assets[0].height,
      };
      navigation.navigate("Patroli", { savedPhoto: processedPhoto });
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <View />
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={selectImageFromGallery}
            >
              <Text style={styles.cameraButtonText}>
                <MaterialIcons name="perm-media" size={28} color="#FFF" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Text style={styles.cameraButtonText}>
                <Feather name="camera" size={32} color="#FFF" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleCameraTypeToggle}
            >
              <Text style={styles.cameraButtonText}>
                <MaterialIcons
                  name="flip-camera-android"
                  size={28}
                  color="#FFF"
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
  },
  cameraButtonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
  selectImageButton: {
    backgroundColor: "#44B6C7",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  selectImageButtonText: {
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
    height: 300,
    resizeMode: "contain",
  },
});

export default PatrolCamera;
