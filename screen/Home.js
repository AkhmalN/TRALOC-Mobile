import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
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
import { useAuth } from "../context/userContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Atensi from "../components/Atensi";
import ListAtensi from "../components/ListAtensi";

const Home = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [valueAbsensi, setValueAbsensi] = useState(0);
  const [valuePatroli, setValuePatroli] = useState(0);
  const [valueAktivitas, setValueAktivitas] = useState(0);
  const [atensi, setAtensi] = useState("");

  const currentDate = new Date();
  const { id, role, user } = useAuth();

  return (
    <View style={styles.container}>
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
              <Text style={styles.helloText}>Selamat Datang, {user}</Text>
              <Text style={styles.textDate}>{DateFormat(currentDate)}</Text>
            </View>
          </View>

          <View style={styles.fragment}>
            {/* <CountAbsensi />
          <CountPatrol /> */}
            {/* <CountActivity /> */}
          </View>
        </LinearGradient>

        <View style={styles.featureContent}>
          {/* <KodeSos /> */}
          {role && role === "admin" && <Atensi />}
          {role && role === "user" && <ListAtensi />}
          <AbsenMasuk />
          <AbsenKeluar />
          <Patroli />
          {/* <Aktivitas /> */}
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
    height: "20%",
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
    color: "#F2EFE5",
  },
  helloText: {
    fontSize: 25,
    color: "#FFF",
  },
  fragment: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  sectionAtensi: {
    flexDirection: "column",
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: "space-around",
  },
  containerAtensi: {
    height: 100,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 20,
    padding: 10,
  },
  textAtensi: {},
  formAtensi: {
    flexDirection: "row",
    alignItems: "center",
  },
  formCatatan: {
    fontSize: 16,
    width: "90%",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 20,
    height: 100,
    padding: 5,
  },
  featureContent: {
    paddingLeft: 7,
    paddingRight: 7,
    marginVertical: 15,
  },
  textStyleAtensi: {
    textAlign: "center",
    fontSize: 16,
    color: "#344955",
  },
});

export default Home;
