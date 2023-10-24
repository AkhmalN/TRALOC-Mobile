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
          <Image
            source={require("../assets/person.jpg")}
            style={{
              height: 70,
              width: 70,
              marginTop: 10,
              borderRadius: 50,
            }}
          />
          <View style={styles.descProfile}>
            <Text style={{ color: "#D0E7D2", fontSize: 20 }}>
              Akhmal Novanda Aziz
            </Text>
            <Text style={{ color: "#D0E7D2" }}>xxxxxx</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate("Camera")}
        >
          <View style={styles.iconMenu}>
            <Image
              source={require("../assets/phone-camera.png")}
              style={{ width: 60, height: 70 }}
            />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTextInd}>Absen Masuk</Text>
            <Text style={styles.cardTextEng}>Absen Masuk | Time In</Text>
          </View>
          <View style={styles.iconRight}>
            <Image
              source={require("../assets/right-arrow.png")}
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
              source={require("../assets/exit.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTextInd}>Absen Keluar </Text>
            <Text style={styles.cardTextEng}>Absen Keluar | Time Out</Text>
          </View>
          <View style={styles.iconRight}>
            <Image
              source={require("../assets/right-arrow.png")}
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
              source={require("../assets/torch.png")}
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
              source={require("../assets/right-arrow.png")}
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
    padding: 20,
  },
  nameProfile: {
    color: "#D0E7D2",
  },
  sectionProfile: {
    backgroundColor: "#1b2d45",
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#79AC78",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 6,
    height: 90,
    alignItems: "center",
  },
  iconMenu: {
    width: "15%",
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
