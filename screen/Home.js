import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import { DateFormat } from "../utils/DateFormat";
import KodeSos from "../components/KodeSos";
import AbsenMasuk from "../components/AbsenMasuk";
import AbsenKeluar from "../components/AbsenKeluar";
import Patroli from "../components/Patroli";
import Aktivitas from "../components/Aktivitas";
import CountAbsensi from "../components/CountAbsensi";
import CountPatrol from "../components/CountPatrol";
import CountActivity from "../components/CountActivity";
import axios from "axios";
import { getUserPatroli } from "../api/patroli";
import { getUserAbsenLength } from "../api/absensi";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [valueAbsensi, setValueAbsensi] = useState(0);
  const [valuePatroli, setValuePatroli] = useState(0);
  const [valueAktivitas, setValueAktivitas] = useState(0);

  const currentDate = new Date();

  useEffect(() => {
    AsyncStorage.getItem("username")
      .then((NAME) => {
        setUsername(NAME);
      })
      .catch((error) => {
        throw new Error(error);
      });
    AsyncStorage.getItem("userId")
      .then((ID) => {
        setUserId(ID);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const getCountAttendance = async () => {
    setLoading(true);
    try {
      const response = await getUserAbsenLength(userId);
      setValueAbsensi(response.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountAttendance();
  }, [userId]);

  return (
    <ScrollView>
      <LinearGradient
        colors={["#ffffff", "#088395"]}
        style={styles.banner}
        start={[0, 0]}
        end={[0, 1]}
        angle={45}
      >
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.textDate}>{DateFormat(currentDate)}</Text>
            <Text style={styles.helloText}>Selamat Datang, {username}</Text>
          </View>
          <View>
            <Ionicons name="reload-circle-outline" size={30} />
          </View>
        </View>

        <View style={styles.sectionAtensi}>
          <Text style={styles.textStyleAtensi}>
            Tidak ada atensi yang ditampilkan!
          </Text>
        </View>

        <View style={styles.fragment}>
          <CountAbsensi isLoading={loading} value={valueAbsensi} />
          <CountPatrol />
          <CountActivity />
        </View>
      </LinearGradient>

      <View style={styles.featureContent}>
        <KodeSos />
        <AbsenMasuk />
        <AbsenKeluar />
        <Patroli />
        <Aktivitas />
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 50,
    height: "30%",
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  helloText: {
    fontSize: 25,
  },
  fragment: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  sectionAtensi: {
    marginVertical: 10,
    marginHorizontal: 10,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 20,
  },
  featureContent: {
    paddingLeft: 7,
    paddingRight: 7,
    margin: 10,
  },
  textStyleAtensi: {
    textAlign: "center",
    fontSize: 16,
    color: "#344955",
  },
});

export default Home;
