import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { BG_COLOR, ICON_COLOR, TEXT_COLOR } from "../constant/color";
const Profil = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Lakukan validasi sebelum logout (misalnya: konfirmasi dengan alert)
      Alert.alert(
        "Sistem",
        "Apakah Anda yakin ingin keluar dari aplikasi?",
        [
          {
            text: "Batal",
            style: "cancel",
          },
          {
            text: "Keluar",
            onPress: async () => {
              // Hapus data autentikasi dari AsyncStorage (atau tempat penyimpanan lainnya)
              // await AsyncStorage.removeItem("authToken");
              // Navigasi kembali ke halaman login atau halaman awal aplikasi
              // Ganti 'Login' dengan nama halaman login atau halaman awal aplikasi Anda
              navigation.navigate("Login");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("Data Pribadi")}
      >
        <View style={styles.iconMenu}>
          <Feather name="user" size={35} color={ICON_COLOR.light} />
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardText}>Data Pribadi</Text>
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
        style={[styles.cardContainer, { backgroundColor: BG_COLOR.danger }]}
        onPress={handleLogout}
      >
        <View style={styles.iconMenu}>
          <Entypo name="log-out" size={35} color={ICON_COLOR.light} />
        </View>
        <View style={styles.cardTitle}>
          <Text style={[styles.cardText, { color: TEXT_COLOR.light }]}>
            Log Out
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 20,
  },
  cardText: {
    color: TEXT_COLOR.light,
    fontSize: 20,
  },
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    height: 80,
    alignItems: "center",
    backgroundColor: BG_COLOR.primary,
    marginBottom: 10,
    borderRadius: 20,
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

export default Profil;
