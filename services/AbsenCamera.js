import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function AbsenCamera() {
  const absenRoute = useRoute();
  let cameraRef = useRef();
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  const takePic = async () => {
    if (cameraRef.current) {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  useEffect(() => {
    if (photo) {
      const absenType = absenRoute.params?.absenType;
      navigation.navigate(
        absenType === "masuk" ? "AbsenMasuk" : "AbsenKeluar",
        {
          savedPhoto: photo,
        }
      );
    }
  }, [photo, absenRoute.params?.absenType, navigation]);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  return (
    <Camera style={styles.container} type={cameraType} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={takePic} style={styles.button}>
            <Text style={styles.buttonText}>
              <Feather name="camera" size={32} color="#FFF" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
            <Text style={styles.buttonText}>
              <MaterialIcons
                name="flip-camera-android"
                size={28}
                color="#FFF"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  buttonFlex: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#44B6C7",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
