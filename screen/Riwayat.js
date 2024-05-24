import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/userContext";
import { BG_COLOR, ICON_COLOR, TEXT_COLOR } from "../constant/color";

const Riwayat = () => {
  const { role } = useAuth();
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
            color={ICON_COLOR.light}
          />
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTextInd}>Riwayat Absensi</Text>
          <Text style={styles.cardTextEng}>
            Riwayat Kehadiran | Attendance History
          </Text>
        </View>
        <View style={styles.iconRight}>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={ICON_COLOR.light}
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
            color={ICON_COLOR.light}
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
            color={ICON_COLOR.light}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("Riwayat Aktivitas")}
      >
        <View style={styles.iconMenu}>
          <MaterialCommunityIcons
            name="note-edit"
            size={35}
            color={ICON_COLOR.light}
          />
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTextInd}>Riwayat Aktivitas</Text>
          <Text style={styles.cardTextEng}>
            Riwayat Aktivitas | Activity History
          </Text>
        </View>
        <View style={styles.iconRight}>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={ICON_COLOR.light}
          />
        </View>
      </TouchableOpacity>
      {(role === "admin" || role === "danru" || role === "danton") && (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate("Riwayat Atensi")}
        >
          <View style={styles.iconMenu}>
            <MaterialCommunityIcons
              name="note-edit"
              size={35}
              color={ICON_COLOR.light}
            />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTextInd}>Riwayat Atensi</Text>
            <Text style={styles.cardTextEng}>
              Riwayat Atensi | Attention History
            </Text>
          </View>
          <View style={styles.iconRight}>
            <Ionicons
              name="chevron-forward-outline"
              size={30}
              color={ICON_COLOR.light}
            />
          </View>
        </TouchableOpacity>
      )}
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

export default Riwayat;
