import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../context/userContext";
import Footer from "../components/Footer";
import Patroli from "../components/Patroli";
import Atensi from "../components/Atensi";
import ListAtensi from "../components/ListAtensi";
import Presensi from "../components/AbsenMasuk";
import Aktivitas from "../components/Aktivitas";
import AbsenKeluar from "../components/AbsenKeluar";
import KodeSos from "../components/KodeSos";

const Home = () => {
  const { role } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.featureContent}>
          {(role === "admin" || role === "danru" || role === "chief") && (
            <Atensi />
          )}
          {role === "anggota" && <ListAtensi />}
          <Presensi />
          <Aktivitas />
          <Patroli />
          <AbsenKeluar />
          <KodeSos />
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textDate: {
    fontSize: 18,
    color: "#44B6C7",
    fontWeight: "bold",
  },
  helloText: {
    fontSize: 25,
    color: "#44B6C7",
  },
  featureContent: {
    paddingLeft: 7,
    paddingRight: 7,
    marginVertical: 15,
  },
});

export default Home;
