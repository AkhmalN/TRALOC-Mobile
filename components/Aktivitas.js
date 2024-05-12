import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Aktivitas = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Aktivitas")}
    >
      <View style={styles.iconMenu}>
        <Ionicons name="reader-outline" size={35} color={"#088395"} />
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTextInd}>Buat Aktivitas</Text>
        <Text style={styles.cardTextEng}>Buat Laporan aktivitas harian</Text>
      </View>
      <View style={styles.iconRight}>
        <Ionicons name="chevron-forward-outline" size={30} color={"#088395"} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    height: 80,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#088395",
  },
  iconMenu: {
    width: "10%",
    marginRight: 10,
  },
  cardTitle: {
    width: "80%",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  iconRight: {
    width: "10%",
    marginRight: 10,
  },
  cardTextInd: {
    fontSize: 20,
    color: "#088395",
    fontWeight: "bold",
  },
  cardTextEng: {
    color: "#088395",
    fontSize: 18,
  },
});

export default Aktivitas;
