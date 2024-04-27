import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { DateFormat, TimeFormat } from "../utils/DateFormat";

export default function DetailAtensi() {
  const route = useRoute();
  const data = route.params?.data;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Judul Atensi</Text>
          <Text style={styles.value}>{data.judul_atensi}</Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Tanggal Mulai</Text>
          <Text style={styles.value}>{DateFormat(data.tanggal_mulai)}</Text>
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Tanggal Selesai</Text>
          <Text style={styles.value}>{DateFormat(data.tanggal_selesai)}</Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Tanggal Atensi Dibuat:</Text>
          <Text style={styles.value}>
            {DateFormat(data.createdAt)}, {TimeFormat(data.createdAt)}
          </Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Catatan Atensi:</Text>
          <Text style={styles.value}>{data.catatan}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: data.image }} style={styles.image} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  formItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    width: 150,
  },
  value: {
    fontSize: 20,
    maxWidth: 250,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
