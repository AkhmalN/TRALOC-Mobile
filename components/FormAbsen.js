import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

export default function FormAbsen({ route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { savedPhoto } = route.params;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }
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
              title="Parkiran Mobil Depan Loby"
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
                <Text>Posisi Anda Saat ini :</Text>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kirim Absen</Text>
          <Image
            source={require("../assets/icon/Send.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
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
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#79AC78",
    height: 50,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#D0E7D2",
    fontSize: 16,
  },
});
