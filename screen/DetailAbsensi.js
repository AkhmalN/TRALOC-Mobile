import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { DateFormat, TimeFormat } from "../utils/DateFormat";

export default function DetailAbsensi() {
  const route = useRoute();
  const data = route.params?.data;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContent}>
        <View style={styles.imageContent}>
          <Image
            source={{
              uri: data.image,
            }}
            style={{ width: 120, height: 120, borderRadius: 10 }}
          />
        </View>
        <View style={styles.textContent}>
          <Text style={{ fontSize: 19 }}>
            Tanggal : {DateFormat(data.checkInTime)}
          </Text>
          <Text style={{ fontSize: 19 }}>
            Jam : {TimeFormat(data.checkInTime)}
          </Text>
          <Text style={{ fontSize: 19 }}>
            Koordinat : {data.latitude}, {data.longitude}
          </Text>
          <Text style={{ fontSize: 19 }}>
            Lokasi Absen : {data.lokasi_absen}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContent: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  textContent: {
    width: "70%",
    marginHorizontal: 5,
  },
});
