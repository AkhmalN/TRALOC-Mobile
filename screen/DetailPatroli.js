import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { DateFormat } from "../utils/DateFormat";
import { imageUrl } from "../api/apiConfig";

export default function DetailPatroli() {
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
          <Text style={{ fontSize: 18 }}>{data.location}</Text>
          <Text style={{ fontSize: 18 }}>
            Waktu : {DateFormat(data.createdAt)}
          </Text>
          <Text style={{ fontSize: 18 }}>Status : {data.status}</Text>
          <Text style={{ fontSize: 18 }}>Catatan : {data.notes}</Text>
        </View>
        <View style={styles.imageContent}>
          <Image
            source={{
              uri: `${imageUrl}/patroli/${data.image.replace(
                "public\\patroli\\",
                ""
              )}`,
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
