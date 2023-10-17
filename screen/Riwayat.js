import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Riwayat = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Laporan Aktivitas</Text>
      <TouchableOpacity onPress={() => navigation.navigate("DetailRiwayat")}>
        <View style={styles.cardActivity}>
          <View style={styles.titleActivity}>
            <Text style={styles.title}>
              Pos Cyber Library, 20/08/2023 15:12:10
            </Text>
          </View>
          <View>
            <Text>Waktu : 20/08/2023 15:12:10</Text>
            <Text>Lokasi : Pos Cyber Library</Text>
            <Text>Status : Aman</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.cardActivity}>
          <View style={styles.titleActivity}>
            <Text style={styles.title}>
              Pos Cyber Library, 20/08/2023 15:12:10
            </Text>
          </View>
          <View>
            <Text>Waktu : 20/08/2023 15:12:10</Text>
            <Text>Lokasi : Pos Cyber Library</Text>
            <Text>Status : Kehilangan</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Riwayat;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
  },
  cardActivity: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
  },
});
