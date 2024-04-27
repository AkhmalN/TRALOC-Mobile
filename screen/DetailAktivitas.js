import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { DateFormat, TimeFormat } from "../utils/DateFormat";

export default function DetailAktivitas() {
  const route = useRoute();
  const data = route.params?.data;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Instansi Aktivitas:</Text>
          <Text style={styles.value}>{data.instansi_aktivitas}</Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Pos Aktivitas:</Text>
          <Text style={styles.value}>{data.pos_aktivitas}</Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Waktu:</Text>
          <Text style={styles.value}>
            {DateFormat(data.createdAt)}, {TimeFormat(data.createdAt)}
          </Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Catatan:</Text>
          <Text style={styles.value}>{data.notes_aktivitas}</Text>
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
