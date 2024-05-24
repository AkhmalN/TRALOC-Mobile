import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/userContext";
import ModalLoading from "../components/ModalLoading";
import { Notifikasi } from "./Notifikasi";
import { addAbsenKeluar } from "../api/absensi";
import { BG_COLOR, ICON_COLOR, TEXT_COLOR } from "../constant/color";

const AbsenKeluar = () => {
  const { id } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const hideNotifikasi = () => {
    setNotifikasiVisible(false);
  };

  const handleOnCheckOut = async () => {
    Alert.alert(
      "Sistem",
      "Apakah Anda yakin akan mengakhiri jam kerja?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Keluar",
          onPress: async () => {
            setLoading(true);
            try {
              const response = await addAbsenKeluar({
                userId: id,
              });
              if (response.status === 200) {
                setLoading(false);
                setNotifikasiVisible(true);
                setIsSuccess(true);
                setTimeout(() => {
                  setNotifikasiVisible(false);
                  setIsSuccess(false);
                }, 2000);
              }
            } catch (error) {
              setLoading(false);
              setErrMsg(error.message);
              setNotifikasiVisible(true);
              setIsError(true);
              setTimeout(() => {
                setNotifikasiVisible(false);
                setErrMsg("");
                setIsError(false);
              }, 2000);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  if (loading) {
    return <ModalLoading />;
  }

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleOnCheckOut}>
      {isSuccess && notifikasiVisible && (
        <Notifikasi
          message={"Laporan absen keluar berhasil dibuat"}
          hideModal={hideNotifikasi}
        />
      )}
      {isError && notifikasiVisible && (
        <Notifikasi message={errMsg} hideModal={hideNotifikasi} />
      )}
      <View style={styles.iconMenu}>
        <Ionicons
          name="arrow-back-circle-outline"
          size={35}
          color={ICON_COLOR.light}
        />
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTextInd}>Absensi Keluar | Check Out</Text>
        <Text style={styles.cardTextEng}>Buat absensi selesai kerja</Text>
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

export default AbsenKeluar;
