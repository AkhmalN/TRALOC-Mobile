import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
const Riwayat = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("Riwayat Absensi")}
      >
        <View style={styles.iconMenu}>
          <MaterialCommunityIcons
            name="note-edit"
            size={35}
            color={"#088395"}
          />
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTextInd}>Riwayat Kehadiran</Text>
          <Text style={styles.cardTextEng}>
            Riwayat Kehadiran | Attendance History
          </Text>
        </View>
        <View style={styles.iconRight}>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={"#088395"}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("Riwayat Patroli")}
      >
        <View style={styles.iconMenu}>
          <MaterialCommunityIcons
            name="note-edit"
            size={35}
            color={"#088395"}
          />
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTextInd}>Riwayat Patroli</Text>
          <Text style={styles.cardTextEng}>
            Riwayat Patroli | Patrol History
          </Text>
        </View>
        <View style={styles.iconRight}>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={"#088395"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 20,
  },
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
    fontSize: 18,
    color: "#088395",
    fontWeight: "bold",
  },
  cardTextEng: {
    color: "#088395",
  },
});

export default Riwayat;
