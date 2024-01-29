import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function DetailAbsensi() {
  const route = useRoute();
  const data = route.params?.data;
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.001, // This sets the zoom level
            longitudeDelta: 0.001, // This sets the zoom level
          }}
        >
          <Marker
            key={1}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title="Lokasi Anda"
          ></Marker>
        </MapView>
      </View>
      <View style={styles.bottomContent}>
        <Text>Waktu : {data.createdAt}</Text>
        <Text>
          Lokasi : {data.latitude}, {data.longitude}
        </Text>
        <Text>Status : Absen Masuk</Text>
        <Image
          source={{
            uri: `http://192.168.141.180:8083/uploads/${data.image.replace(
              "public\\uploads\\",
              ""
            )}`,
          }}
          style={{ width: 100, height: 100 }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 500,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContent: {
    marginTop: 20,
    flex: 1,
  },
});
