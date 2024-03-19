import { useState, useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserAbsen } from "../api/absensi";
import { DateFormat } from "../utils/DateFormat";
import { imageUrl } from "../api/apiConfig";

const Absensi = () => {
  const [absensiData, setAbsensiData] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    try {
      const absenData = await getUserAbsen(userId);
      setAbsensiData(absenData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAbsensiData();
  }, [userId]);

  const handleDetail = (data) => {
    navigation.navigate("DetailAbsensi", { data: data });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Riwayat absensi</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#088395" />
        </View>
      ) : absensiData && absensiData.length > 0 ? (
        absensiData.map((data, index) => (
          <View style={styles.containerCard} key={index}>
            <TouchableWithoutFeedback
              onPress={() => handleDetail(data)}
              style={styles.card}
            >
              <View style={styles.cardActivity}>
                <View style={styles.containerImage}>
                  <Image
                    source={{
                      uri: `${imageUrl}/absensi/${data.image.replace(
                        "public\\absensi\\",
                        ""
                      )}`,
                    }}
                    style={{ width: 90, height: 80, borderRadius: 10 }}
                  />
                </View>
                <View style={styles.containerText}>
                  <Text style={{ fontSize: 16 }}>
                    Waktu : {DateFormat(data.createdAt)}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Coordinate : {data.latitude} {data.longitude}
                  </Text>
                  <Text style={{ fontSize: 16 }}>Status : Absen Masuk</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ))
      ) : (
        <Text>{error}</Text>
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

  containerImage: {
    marginRight: 10,
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#088395",
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
  containerCard: {
    flexDirection: "column",
    padding: 5,
  },
  containerText: {
    flexDirection: "column",
    justifyContent: "center",
  },
  cardActivity: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
