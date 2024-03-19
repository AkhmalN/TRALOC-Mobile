import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Notifikasi } from "../components/Notifikasi";
import { baseUrl } from "../api/apiConfig";

export default function FormAbsen({ route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { savedPhoto } = route.params;
  const [username, setUsername] = useState([]);
  const [userId, setUserId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);

  const navigation = useNavigation();

  const hideNotifikasi = () => {
    setNotifikasiVisible(false);
  };

  useEffect(() => {
    // Ambil username dari AsyncStorage saat komponen di-mount
    AsyncStorage.getItem("username")
      .then((value) => {
        if (value) {
          setUsername(value);
        }
      })
      .catch((error) => {});
    AsyncStorage.getItem("userId")
      .then((ID) => {
        if (ID) {
          setUserId(ID);
        }
      })
      .catch((error) => {});
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
      setLongitude(location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    if (savedPhoto) {
      setImages([savedPhoto]); // Assuming savedPhoto.uri is the image URI
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
    setLoading(true);
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

      const response = await axios.post(`${baseUrl}/absensi/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setLoading(false);
        setIsSuccess(true);
        setNotifikasiVisible(true);
        setTimeout(() => {
          setNotifikasiVisible(false);
          navigation.navigate("Home");
        }, 5000);
      }
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {isSuccess && notifikasiVisible && (
          <Notifikasi
            message={"Berhasil mengirim absensi"}
            hideModal={hideNotifikasi}
          />
        )}
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
          <Text>Loading location ...</Text>
        )}
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.formContainer}>
          <View style={styles.formSection}>
            {location ? (
              <View>
                <Text style={styles.label}>koordinat Anda Saat ini :</Text>
                <View style={styles.form}>
                  <Text>
                    {location.coords.latitude},{location.coords.longitude}
                  </Text>
                </View>
                <Text style={styles.label}>Waktu Saat ini :</Text>
                <View style={styles.form}>
                  <Text>{new Date(location.timestamp).toLocaleString()}</Text>
                </View>
              </View>
            ) : (
              <Text>Loading data...</Text>
            )}
          </View>
          <View style={styles.imageSection}>
            {savedPhoto && (
              <Image
                source={{ uri: savedPhoto.uri }}
                style={{ width: 150, height: 120, borderRadius: 10 }}
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
          {loading ? (
            <>
              <Text style={styles.buttonText}>Mengirim Absen</Text>
              <ActivityIndicator
                size={"small"}
                style={{ marginLeft: 10, marginRight: 10 }}
                color={"#FFF"}
              />
            </>
          ) : (
            <>
              <Text style={styles.buttonText}>Kirim Absen</Text>
              <Image
                source={require("../assets/icon/Send.png")}
                style={styles.icon}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  alertSuccess: {
    position: "absolute",
    backgroundColor: "#088395",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  alertError: {
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  alertText: {
    fontSize: 19,
    color: "#FFF",
  },
  bottomContent: {
    width: "100%",
    marginTop: 20,
    flex: 1,
    alignContent: "center",
    height: 60,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  formSection: {
    marginRight: 20,
  },
  imageSection: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  form: {
    justifyContent: "center",
    height: 35,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "#D0E7D2",
    fontSize: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#088395",
    height: 50,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 8,
    padding: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    marginLeft: 10,
  },
});
