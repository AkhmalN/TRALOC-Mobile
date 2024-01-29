import { Image, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Absensi from "../controllers/get-absensi";
import Patroli from "../controllers/get-patroli";

const Riwayat = () => {
  const navigation = useNavigation();
  const [selectedNavigation, setSelectedNavigation] = useState("Absensi");
  const [showAbsensi, setShowAbsensi] = useState(true);
  const [showPatroli, setShowPatroli] = useState(false);

  const handleToAbsensi = () => {
    setSelectedNavigation("GetAbsensi");
    setShowAbsensi(true);
    setShowPatroli(false);
  };
  const handleToPatroli = () => {
    setSelectedNavigation("GetPatroli");
    setShowAbsensi(false);
    setShowPatroli(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerSelector}>
        <TouchableOpacity
          style={
            showPatroli
              ? styles.buttonSelectorActive
              : styles.buttonSelectorinActive
          }
          onPress={handleToPatroli}
        >
          <Text
            style={
              showPatroli ? styles.buttonTextActive : styles.buttonTextinActive
            }
          >
            Patroli
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            showAbsensi
              ? styles.buttonSelectorActive
              : styles.buttonSelectorinActive
          }
          onPress={handleToAbsensi}
        >
          <Text
            style={
              showAbsensi ? styles.buttonTextActive : styles.buttonTextinActive
            }
          >
            Absensi
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerCard}>
        {showAbsensi && <Absensi />}
        {showPatroli && <Patroli />}
      </View>
    </ScrollView>
  );
};
export default Riwayat;

const styles = StyleSheet.create({
  container: {},
  containerSelector: {
    flexDirection: "row",
    padding: 10,
  },
  buttonSelectorActive: {
    flexDirection: "row",
    marginRight: 10,
    backgroundColor: "#088395",
    padding: 10,
    borderRadius: 5,
  },
  buttonSelectorinActive: {
    flexDirection: "row",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#088395",
    padding: 10,
    borderRadius: 5,
  },
  buttonTextActive: {
    color: "#FFF",
  },
  buttonTextinActive: {
    color: "#088395",
  },
  containerCard: {},
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
