import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { BG_COLOR, ICON_COLOR, TEXT_COLOR } from "../constant/color";

const Patroli = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Patroli")}
    >
      <View style={styles.iconMenu}>
        <MaterialIcons
          name="qr-code-scanner"
          size={35}
          color={ICON_COLOR.light}
        />
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTextInd}>Buat Patroli</Text>
        <Text style={styles.cardTextEng}>Buat laporan patroli harian</Text>
      </View>
      <View style={styles.iconRight}>
        <Ionicons
          name="chevron-forward-outline"
          size={30}
          color={ICON_COLOR.light}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    height: 80,
    alignItems: "center",
    backgroundColor: BG_COLOR.primary,
    marginBottom: 10,
    borderRadius: 20,
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: TEXT_COLOR.light,
    fontWeight: "bold",
  },
  flexCardtext: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  cardTextEng: {
    color: TEXT_COLOR.light,
    fontSize: 18,
  },
});

export default Patroli;
