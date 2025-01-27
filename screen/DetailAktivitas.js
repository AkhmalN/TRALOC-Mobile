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

export default function DetailAktivitas() {
  const route = useRoute();
  const data = route.params?.data;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <Text style={styles.label}>Instansi Aktivitas :</Text>
            <Text style={styles.value}>{data.instansi_aktivitas}</Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Pos Aktivitas :</Text>
            <Text style={[styles.value, { maxWidth: 200 }]}>
              {data.pos_aktivitas}
            </Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Waktu :</Text>
            <Text style={styles.value}>
              {DateFormat(data.createdAt)}, {TimeFormat(data.createdAt)}
            </Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.label}>Catatan:</Text>
            <Text style={styles.value}>{data.notes_aktivitas}</Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
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
  },
  formContainer: {
    marginBottom: 20,
    padding: 20,
  },
  formItem: {
    flexDirection: "row",
    marginBottom: 5,
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
