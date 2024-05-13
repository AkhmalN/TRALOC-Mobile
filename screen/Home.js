import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../context/userContext";
import Footer from "../components/Footer";
import { DateFormat } from "../utils/DateFormat";
import Patroli from "../components/Patroli";
import Atensi from "../components/Atensi";
import ListAtensi from "../components/ListAtensi";
import Presensi from "../components/AbsenMasuk";
import Aktivitas from "../components/Aktivitas";

const Home = () => {
  const currentDate = new Date();
  const { role, user } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.banner}>
          <View style={styles.userInfo}>
            <Text style={styles.helloText}>Selamat Datang, {user}</Text>
            <Text style={styles.textDate}>{DateFormat(currentDate)}</Text>
          </View>
        </View>

        <View style={styles.featureContent}>
          {(role === "admin" || role === "danru" || role === "danton") && (
            <Atensi />
          )}
          {role === "user" && <ListAtensi />}
          <Presensi />
          <Aktivitas />
          <Patroli />
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
  banner: {
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
