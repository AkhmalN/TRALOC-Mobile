import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet } from "react-native";

const Riwayat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Laporan Aktivitas</Text>
      <View style={styles.cardActivity}>
        <View style={styles.titleActivity}>
          <Text style={styles.title}>
            Pos Cyber Library, 20/08/2023 15:12:10
          </Text>
        </View>
        <View>
          <Text>Waktu : 20/08/2023 15:12:10</Text>
          <Text>Lokasi : Pos Cyber Library</Text>
        </View>
      </View>
      <View style={styles.cardActivity}>
        <View style={styles.titleActivity}>
          <Text style={styles.title}>
            Pos Cyber Library, 20/08/2023 15:12:10
          </Text>
        </View>
        <View>
          <Text>Waktu : 20/08/2023 15:12:10</Text>
          <Text>Lokasi : Pos Cyber Library</Text>
        </View>
      </View>
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
