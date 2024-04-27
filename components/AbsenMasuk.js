import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";

const Presensi = ({ status }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("AbsenCamera", { absenType: "masuk" })}
    >
      <View style={styles.iconMenu}>
        <Ionicons
          name="arrow-forward-circle-outline"
          size={35}
          color={"#088395"}
        />
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTextInd}>Absensi Masuk</Text>
        <Text style={styles.cardTextEng}>Absensi Masuk | Check In</Text>
      </View>
      <View style={styles.iconCenter}>
        {status ? <Octicons name="verified" size={30} color="#6DBC46" /> : ""}
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
  iconCenter: {
    width: "10%",
  },
  iconMenu: {
    width: "10%",
    marginRight: 10,
  },
  cardTitle: {
    width: "70%",
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

export default Presensi;
