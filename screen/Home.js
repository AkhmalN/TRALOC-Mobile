import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
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
          <Text>Aktifitas Terakhir</Text>
          <View style={styles.cardHistory}>
            <Text style={styles.cardDateHistory}>22 OKtober 2023</Text>
            <Text style={styles.cardDescHistory}>
              lorem ipsum sir dolor amet
            </Text>
            <Text style={styles.cardLocationHistory}>
              Lokasi : Blok 4 lantai 4
            </Text>
          </View>
        </View>
        <View style={styles.sectionHistory}>
          <View style={styles.cardHistory}>
            <Text style={styles.cardDateHistory}>22 OKtober 2023</Text>
            <Text style={styles.cardDescHistory}>
              lorem ipsum sir dolor amet
            </Text>
            <Text style={styles.cardLocationHistory}>
              Lokasi : Blok 4 lantai 4
            </Text>
          </View>
        </View>
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
