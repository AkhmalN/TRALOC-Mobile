import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = (props) => {
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
            <Text style={styles.nameProfile}>Akhmal Novanda Aziz</Text>
            <Text style={styles.professionProfile}>Satpam</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.cardContainer}>
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
        <TouchableOpacity style={styles.cardContainer}>
          <View style={styles.iconMenu}>
            <Image
              source={require("../assets/exit.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTextInd}>Absen Keluar</Text>
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
    padding: 10,
  },
  nameProfile: {
    color: "#abd1c6",
  },
  sectionProfile: {
    backgroundColor: "#1b2d45",
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#16C79A",
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
    color: "#FAF7F0",
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
