import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

const Riwayat = () => {
  const [patrolData, setPatrolData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Ambil username dari AsyncStorage saat komponen di-mount
    AsyncStorage.getItem("username")
      .then((username) => {
        console.log(username);
        if (username) {
          axios
            .get(`http://192.168.192.180:8083/api/users/patrol/${username}`)
            .then((response) => {
              console.log(response.data);
              setPatrolData(response.data);
            })
            .catch((error) => {
              console.error("Gagal mengambil data patroli:", error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDetail = (detailData) => {
    navigation.navigate("DetailRiwayat", { detailData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Laporan Aktivitas</Text>
      {patrolData.map((data, index) => {
        return (
          <TouchableOpacity onPress={() => handleDetail(data)} key={index}>
            <View style={styles.cardActivity}>
              <View style={styles.titleActivity}>
                <Text style={styles.title}>
                  {data.name}, {new Date(data.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View>
                <Text>
                  Waktu : {new Date(data.createdAt).toLocaleDateString()}
                </Text>
                <Text>
                  Coordinate : {data.latitude} {data.longitude}
                </Text>
                <Text>Status : {data.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
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
