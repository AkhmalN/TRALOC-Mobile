import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";
import { DateFormat, TimeFormat } from "../utils/DateFormat";

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
        <Text style={styles.cardTextInd}>Absensi Masuk | Check In</Text>
        {status ? (
          <View style={styles.flexCardtext}>
            <Text style={styles.cardTextEng}>Check In : </Text>
            <Text style={styles.cardTextHour}>{TimeFormat(status)}</Text>
            <Text style={[styles.cardTextHour, { marginLeft: 5 }]}>
              {DateFormat(status)}
            </Text>
          </View>
        ) : (
          <Text style={styles.cardTextEng}>Check In Absensi Saat Ini</Text>
        )}
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
  flexCardtext: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  cardTextEng: {
    color: "#088395",
    fontSize: 18,
  },
  cardTextHour: {
    fontSize: 18,
    color: "#FFF",
    backgroundColor: "#1BDD9E",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

export default Presensi;
