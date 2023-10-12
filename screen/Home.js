import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Tracking Location App</Text>
        <View style={styles.sectionProfile}>
          <Image
            source={require("../assets/userlogo.png")}
            style={{
              height: 60,
              width: 80,
              marginTop: 10,
              borderRadius: 50,
            }}
          />
          <View style={styles.descProfile}>
            <Text style={styles.nameProfile}>User 1</Text>
            <Text style={styles.professionProfile}>Satpam</Text>
          </View>
        </View>
        <View style={styles.sectionHistory}>
          <Text>E-Patrol Menu</Text>
          <View style={styles.cardHistory}>
            <Text style={styles.cardDescHistory}>SOS</Text>
            <Text style={styles.cardLocationHistory}>Kirim SOS | Send SOS</Text>
          </View>
        </View>
        <View style={styles.sectionHistory}>
          <View style={styles.cardHistory}>
            <Text style={styles.cardDescHistory}>Absen Masuk</Text>
            <Text style={styles.cardLocationHistory}>
              Absen Masuk | Time In
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.sectionHistory}
          onPress={() => props.navigation.navigate("Patroli")}
        >
          <View style={styles.cardHistory}>
            <Text style={styles.cardDescHistory}>Buat Patroli</Text>
            <Text style={styles.cardLocationHistory}>
              Buat Laporan Patroli | Create Patrol Report
            </Text>
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
  title: {
    textAlign: "center",
  },
  sectionProfile: {
    padding: 10,
    flexDirection: "row",
    height: 100,
  },
  descProfile: {
    marginTop: 20,
    marginLeft: 10,
  },
  nameProfile: {
    width: 60,
    fontSize: 18,
  },
  professionProfile: {
    fontSize: 13,
  },
  cardHistory: {
    backgroundColor: "#6499E9",
    borderRadius: 20,
    padding: 10,
    color: "#FAF7F0",
    marginTop: 10,
    marginBottom: 10,
  },
  cardDateHistory: {
    color: "#FAF7F0",
  },
  cardDescHistory: {
    color: "#FAF7F0",
  },
  cardLocationHistory: {
    color: "#FAF7F0",
  },
});
