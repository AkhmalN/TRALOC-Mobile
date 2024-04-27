import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { DateFormat } from "../utils/DateFormat";

export default function DetailAbsensi() {
  const route = useRoute();
  const data = route.params?.data;
  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.textContent}>
          <Text style={{ fontSize: 18 }}>
            Waktu : {DateFormat(data.createdAt)}
          </Text>
          <Text style={{ fontSize: 18 }}>
            Koordinat : {data.latitude}, {data.longitude}
          </Text>
          <Text style={{ fontSize: 18 }}>
            Lokasi Absen : {data.lokasi_absen}
          </Text>
        </View>
        <View style={styles.imageContent}>
          <Image
            source={{
              uri: data.image,
            }}
            style={{ width: 120, height: 120, borderRadius: 10 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: "50%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContent: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  textContent: {
    width: "70%",
  },
});
