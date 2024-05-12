import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { DateFormat, TimeFormat } from "../utils/DateFormat";

export default function DetailPatroli() {
  const route = useRoute();
  const data = route.params?.data;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <Text style={styles.label}>Instansi Patroli:</Text>
            <Text style={styles.value}>{data.nama_instansi}</Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Pos Patroli:</Text>
            <Text style={styles.value}>{data.lokasi_pos}</Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Waktu:</Text>
            <Text style={styles.value}>
              {DateFormat(data.createdAt)}, {TimeFormat(data.createdAt)}
            </Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{data.status}</Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Catatan:</Text>
            <Text style={styles.value}>{data.notes}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Dokumentasi :</Text>

          {data.image.map((uri, id) => {
            return (
              <Image source={{ uri: uri }} style={styles.image} key={id} />
            );
          })}
        </View>
      </ScrollView>
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
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginVertical: 5,
  },
});
