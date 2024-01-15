import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { BackgroundImage } from "@rneui/base";

const Home = (props) => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Ambil username dari AsyncStorage saat komponen di-mount
    AsyncStorage.getItem("username")
      .then((value) => {
        if (value) {
          setUsername(value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BG.jpg")}
        style={styles.profile}
      >
        <Image source={require("../assets/person.jpg")} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.nameText}>{username}</Text>
          <View style={styles.roleContainer}>
            <Ionicons name="man-outline" style={styles.roleIcon} size={18} />
            <Text style={styles.jobtext}>Security</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.sectionAtensi}>
        <Text>Tidak ada atensi yang ditampilkan</Text>
      </View>
      <View style={styles.featureContent}>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate("AbsenCamera")}
        >
          <View style={styles.iconMenu}>
            <Ionicons
              name="arrow-forward-circle-outline"
              size={35}
              color={"#FFF"}
            />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTextInd}>Absen Masuk</Text>
            <Text style={styles.cardTextEng}>Absen Masuk | Time In</Text>
          </View>
          <View style={styles.iconRight}>
            <Image
              source={require("../assets/icon/Expand_right_stop.png")}
              style={{ width: 20, height: 25 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate("Absen")}
        >
          <View style={styles.iconMenu}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={35}
              color={"#FFF"}
            />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTextInd}>Absen Keluar </Text>
            <Text style={styles.cardTextEng}>Absen Keluar | Time Out</Text>
          </View>
          <View style={styles.iconRight}>
            <Image
              source={require("../assets/icon/Expand_right_stop.png")}
              style={{ width: 20, height: 25 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => props.navigation.navigate("Patroli")}
        >
          <View style={styles.iconMenu}>
            <Image
              source={require("../assets/icon/check_1.png")}
              style={{ width: 35, height: 40 }}
            />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTextInd}>Buat Patroli</Text>
            <Text style={styles.cardTextEng}>
              Buat Laporan Patroli | Create Patrol Report
            </Text>
          </View>
          <View style={styles.iconRight}>
            <Image
              source={require("../assets/icon/Expand_right_stop.png")}
              style={{ width: 20, height: 25 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="#91C8E4" />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },

  profile: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#96EFFF", // You can set a background color with some transparency
    borderBottomLeftRadius: 20, // Adjust the border radius as needed
    borderBottomRightRadius: 20, // Adjust the border radius as needed
    borderBottomColor: "#ccc",
    overflow: "hidden",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  userInfo: {
    flexDirection: "column",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#088395",
    color: "#FFF",
    textAlign: "center",
    borderRadius: 20,
    alignItems: "center",
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  roleIcon: {
    marginRight: 5,
    color: "#FFF",
  },
  jobtext: {
    fontSize: 14,
    color: "#FFF", // You can change the text color as needed
  },
  sectionAtensi: {
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 20,
    backgroundColor: "#D9D9D9",
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  featureContent: {
    paddingLeft: 7,
    paddingRight: 7,
  },
  textStyleAtensi: {
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#088395",
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    height: 80,
    alignItems: "center",
  },
  iconMenu: {
    width: "10%",
    marginRight: 10,
  },
  cardTitle: {
    width: "80%",
    borderRadius: 20,
    padding: 10,
    color: "#D0E7D2",
    marginTop: 10,
    marginBottom: 10,
  },
  iconRight: {
    width: "10%",
    marginRight: 10,
  },
  sectionProfile: {
    padding: 10,
    flexDirection: "row",
    height: 100,
  },
  professionProfile: {
    fontSize: 13,
  },
  cardTextInd: {
    fontSize: 18,
    color: "#F7F7F7",
  },
  cardTextEng: {
    color: "#F7F7F7",
  },
});
