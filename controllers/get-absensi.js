import { useState, useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Absensi = () => {
  const [absensiData, setAbsensiData] = useState([]);
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((ID) => {
        setUserId(ID);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAbsensiData = async () => {
    try {
      await axios
        .get(`http://192.168.100.123:8083/api/v1/absensi/`)
        .then((response) => {
          if (response.status === 201) {
            setAbsensiData(response.data);
          }
        })
        .catch((error) => {
          console.error("Gagal mengambil data patroli:", error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getAbsensiData();
  }, []);

  const handleDetail = (data) => {
    navigation.navigate("DetailAbsensi", { data: data });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Laporan Absensi</Text>
      {absensiData.length > 0 ? (
        <View style={styles.containerCard}>
          {absensiData.map((data, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => handleDetail(data)}
                key={index}
                style={styles.card}
              >
                <View style={styles.cardActivity}>
                  <View style={styles.containerImage}>
                    <Image
                      source={{
                        uri: `http://192.168.100.123:8083/uploads/${data.image.replace(
                          "public\\uploads\\",
                          ""
                        )}`,
                      }}
                      style={{ width: 90, height: 80, borderRadius: 10 }}
                    />
                  </View>
                  <View style={styles.containerText}>
                    <Text style={styles.title}>
                      {data.latitude},{data.longitude}
                    </Text>
                    <Text>
                      Waktu : {new Date(data.createdAt).toLocaleDateString()}
                    </Text>
                    <Text>
                      Coordinate : {data.latitude} {data.longitude}
                    </Text>
                    <Text>Status : Absen Masuk</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#088395" />
        </View>
      )}
    </ScrollView>
  );
};
export default Absensi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSelector: {
    flexDirection: "row",
  },
  buttonSelector: {
    flexDirection: "row",
    marginRight: 10,
  },
  containerCard: {
    padding: 5,
  },
  containerImage: {
    marginRight: 10,
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  flexCard: {},
  cardActivity: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
