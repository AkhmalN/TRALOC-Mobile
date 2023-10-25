import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Home = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.sectionProfile}>
          <View style={styles.descProfile}>
            <Text style={{ color: "#D0E7D2", fontSize: 20 }}>
              Selamat Datang, Akhmal Novanda Aziz
            </Text>
          </View>
          <Image
            source={require("../assets/person.jpg")}
            style={{
              height: 70,
              width: 70,
              marginTop: 10,
              borderRadius: 50,
            }}
          />
        </View>
        <View style={styles.sectionAtensi}>
          <Text style={styles.textStyleAtensi}>
            Tidak Ada Atensi yang ditampilkan
          </Text>
        </View>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate("Camera")}
        >
          <View style={styles.iconMenu}>
            <Image
              source={require("../assets/icon/selfie_1.png")}
              style={{ width: 60, height: 70 }}
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
            <Image
              source={require("../assets/icon/selfie_1.png")}
              style={{ width: 50, height: 50 }}
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
              style={{ width: 50, height: 50 }}
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
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#79AC78",
    padding: 10,
  },
  nameProfile: {
    color: "#D0E7D2",
  },
  sectionProfile: {
    backgroundColor: "#1b2d45",
  },
  sectionAtensi: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#D9D9D9",
    height: 100,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  textStyleAtensi: {
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#618264",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    height: 100,
    alignItems: "center",
  },
  iconMenu: {
    width: "15%",
    marginRight: 10,
  },
  cardTitle: {
    width: "70%",
    borderRadius: 20,
    padding: 10,
    color: "#D0E7D2",
    marginTop: 10,
    marginBottom: 10,
  },
  iconRight: {
    width: "15%",
  },
  sectionProfile: {
    padding: 10,
    flexDirection: "row",
    height: 100,
  },
  descProfile: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
  },
  nameProfile: {
    width: "100%",
    fontSize: 18,
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
