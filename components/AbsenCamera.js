import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AbsenCamera() {
  let cameraRef = useRef();
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        navigation.navigate("FormAbsen", { savedPhoto: photo });
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={styles.actionCam}>
          <TouchableOpacity onPress={sharePic} style={styles.buttonAction}>
            <Text style={styles.buttonText}>Share</Text>
            <Image
              source={require("../assets/icon/Send.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity onPress={savePhoto} style={styles.buttonAction}>
              <Text style={styles.buttonText}>Save</Text>
              <Image
                source={require("../assets/icon/Arhive_load.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : undefined}
          <TouchableOpacity
            onPress={() => setPhoto(undefined)}
            style={styles.buttonAction}
          >
            <Text style={styles.buttonText}>Discard</Text>
            <Image
              source={require("../assets/icon/Cancel.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };
  return (
    <Camera style={styles.container} type={cameraType} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Ambil Foto" onPress={takePic} style={styles.button} />
        <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
          <Text style={styles.buttonText}>
            {cameraType === Camera.Constants.Type.front
              ? "Ganti ke Kamera Belakang"
              : "Ganti ke Kamera Depan"}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79AC78",
  },
  actionCam: {
    flexDirection: "row",
    height: 80,
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "space-evenly",
    backgroundColor: "#B0D9B1",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#B0D9B1",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  actionCam: {
    flexDirection: "row",
    height: 80,
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "space-evenly",
    backgroundColor: "#B0D9B1",
    alignItems: "center",
    borderRadius: 10,
  },
  switchButton: {
    backgroundColor: "#4A7C59",
    padding: 10,
    borderRadius: 5,
  },
  switchButtonText: {
    color: "white",
  },
  buttonAction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
    margin: 10,
    height: 50,
    backgroundColor: "#79AC78",
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
