import { View, Text, Image, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function FormAbsen({ route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { savedPhoto } = route.params;
  const [username, setUsername] = useState([]);
  const [userId, setUserId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    // Ambil username dari AsyncStorage saat komponen di-mount
    AsyncStorage.getItem("username")
      .then((value) => {
        if (value) {
          // console.log(value);
          setUsername(value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    AsyncStorage.getItem("userId")
      .then((ID) => {
        if (ID) {
          // console.log(ID);
          setUserId(ID);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      console.log(latitude);
      setLongitude(location.coords.longitude);
      console.log(longitude);
    })();
  }, []);

  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     const locationSubscription = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.High,
  //         timeInterval: 1000,
  //         distanceInterval: 1,
  //       },
  //       (location) => {
  //         setLocation(location);
  //         setLatitude(location.coords.latitude);
  //         setLongitude(location.coords.longitude);
  //         console.log(latitude, longitude);
  //       }
  //     );

  //     return () => {
  //       if (locationSubscription) {
  //         locationSubscription.remove();
  //       }
  //     };
  //   })();
  // }, []);

  useEffect(() => {
    if (savedPhoto) {
      setImages([savedPhoto.uri]); // Assuming savedPhoto.uri is the image URI
      console.log(savedPhoto.uri);
    }
  }, [savedPhoto]);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(text);
  }

  const handleOnSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("username", username);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("image", {
        uri: savedPhoto.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const response = await axios.post(
        "http://192.168.1.40:8083/api/v1/absensi/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        // setIsSuccses(true);
        // setShowAlert(!showAlert);
        // setIsSuccses(response.data.message);
        // navigation.navigate("Home");
      }
      console.log(response.data);
    } catch (error) {
      // setIsSuccses(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.001, // This sets the zoom level
              longitudeDelta: 0.001, // This sets the zoom level
            }}
          >
            <Marker
              key={1}
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Lokasi Anda"
            ></Marker>
          </MapView>
        ) : (
          <Text>Loading ...</Text>
        )}
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.containerTitle}>
          <View>
            {location ? (
              <View>
                <Text>koordinat Anda Saat ini :</Text>
                <View style={styles.form}>
                  <Text>
                    {location.coords.latitude},{location.coords.longitude}
                  </Text>
                </View>
                <Text>Waktu Saat ini :</Text>
                <View style={styles.form}>
                  <Text>{new Date(location.timestamp).toLocaleString()}</Text>
                </View>
              </View>
            ) : (
              <Text>Loading location data...</Text>
            )}
          </View>
        </View>
        <View style={styles.containerImage}>
          {savedPhoto && (
            <Image
              source={{ uri: savedPhoto.uri }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
          <Text style={styles.buttonText}>Kirim Absen</Text>
          <Image
            source={require("../assets/icon/Send.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAlert(!showAlert)}
        >
          <Text style={styles.buttonText}>Kirim Absen</Text>
        </TouchableOpacity>
        {showAlert && <ToastNotification />} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 500,
    backgroundColor: "#79AC78",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContent: {
    padding: 10,
    width: "100%",
    marginTop: 20,
    flex: 1,
    alignContent: "center",
    backgroundColor: "#D9D9D9",
    height: 60,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  containerTitle: {
    marginBottom: 10,
  },
  containerImage: {
    marginBottom: 10,
  },
  form: {
    justifyContent: "center",
    paddingLeft: 10,
    width: 300,
    height: 35,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#B0D9B1",
    color: "#D0E7D2",
    fontSize: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#79AC78",
    height: 50,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 8,
  },
  buttonText: {
    color: "#D0E7D2",
    fontSize: 18,
  },
});
