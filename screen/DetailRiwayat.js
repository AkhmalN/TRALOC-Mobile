import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function DetailRiwayat() {
  const route = useRoute();
  const { detailData } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitudeDelta: 0.001, // This sets the zoom level
            longitudeDelta: 0.001, // This sets the zoom level
          }}
        >
          <Marker
            key={1}
            coordinate={{
              latitude: detailData.latitude,
              longitude: detailData.longitude,
            }}
            title="Parkiran Mobil Depan Loby"
          ></Marker>
        </MapView>
      </View>
      <View style={styles.bottomContent}>
        <Text>
          Waktu : {new Date(detailData.createdAt).toLocaleDateString()}
        </Text>
        <Text>Lokasi : {detailData.name}</Text>
        <Text>Status : {detailData.status}</Text>
        <TextInput value={detailData.notes} editable={false} />
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
