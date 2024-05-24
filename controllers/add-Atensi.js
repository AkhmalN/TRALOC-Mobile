import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateFormat } from "../utils/DateFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/userContext";
import { createAtensi } from "../api/atensi";
import ModalLoading from "../components/ModalLoading";
import { Notifikasi } from "../components/Notifikasi";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../api/users";

const Atensi = () => {
  const { id, user } = useAuth();
  const navigation = useNavigation();
  // Lifecycle
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);
  const [dateType, setDateType] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nullField, setNullField] = useState(false);
  const [judulAtensi, setJudulAtensi] = useState("");
  const [tglAwalAtensi, setTglAwalAtensi] = useState("");
  const [tglAkhirAtensi, setTglAkhirAtensi] = useState("");
  const [isiAtensi, setIsiAtensi] = useState("");

  const { isLoading: isLoadingUser, data: dataUser } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  const createAtensiMutation = useMutation({
    mutationFn: createAtensi,
    onSuccess: (response) => {
      setIsLoading(false);
      setIsSuccess(true);
      setNotifikasiVisible(true);
      setTimeout(() => {
        setNotifikasiVisible(false);
        setIsSuccess(false);
        setJudulAtensi("");
        setTglAwalAtensi("");
        setTglAkhirAtensi("");
        setIsiAtensi("");
        navigation.navigate("Home");
      }, 2000);
    },
    onError: (error) => {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
    },
  });

  const showDatePicker = (type) => {
    setDatePickerVisible(true);
    setDateType(type);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    if (dateType === "start") {
      setTglAwalAtensi(date);
    } else if (dateType === "end") {
      setTglAkhirAtensi(date);
    }
  };
  const hideNotifikasi = () => {
    setNotifikasiVisible(false);
  };

  const handleTitleChanges = (text) => {
    setJudulAtensi(text);
  };
  const handleNoteChanges = (text) => {
    setIsiAtensi(text);
  };

  const handleOnSubmit = async () => {
    if (
      judulAtensi === "" ||
      tglAwalAtensi === "" ||
      tglAkhirAtensi === "" ||
      isiAtensi === ""
    ) {
      setNullField(true);
      setNotifikasiVisible(true);
    } else {
      setIsLoading(true);
      const data = {
        userId: id,
        username: user,
        nama_lengkap: dataUser.nama_lengkap,
        judul_atensi: judulAtensi,
        tanggal_mulai: tglAwalAtensi,
        tanggal_selesai: tglAkhirAtensi,
        catatan: isiAtensi,
      };
      createAtensiMutation.mutate(data);
    }
  };

  if (isLoadingUser) {
    return <ModalLoading />;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      {isLoading && <ModalLoading />}
      {isSuccess && notifikasiVisible && (
        <Notifikasi
          message={"Atensi berhasil dibuat"}
          hideModal={hideNotifikasi}
        />
      )}
      {nullField && notifikasiVisible && (
        <Notifikasi
          message={"Isi Semua Form yang tersedia"}
          hideModal={hideNotifikasi}
        />
      )}
      <Text style={styles.textOnDate}>Judul Atensi : </Text>
      <TextInput
        multiline
        numberOfLines={2}
        style={styles.inputNote}
        onChangeText={handleTitleChanges}
        value={judulAtensi}
      />

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateOnStart}>
          <Text style={styles.textOnDate}>Tanggal Mulai : </Text>
          <View style={styles.inputForm}>
            <TextInput
              disabled
              label={
                tglAwalAtensi ? `${DateFormat(tglAwalAtensi)}` : "Pilih Tanggal"
              }
              style={styles.inputDisable}
            />
            <AntDesign
              name="calendar"
              size={30}
              color="black"
              onPress={() => showDatePicker("start")}
            />
          </View>
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateOnStart}>
          <Text style={styles.textOnDate}>Tanggal Selesai : </Text>
          <View style={styles.inputForm}>
            <TextInput
              disabled
              label={
                tglAkhirAtensi
                  ? `${DateFormat(tglAkhirAtensi)}`
                  : "Pilih Tanggal"
              }
              style={styles.inputDisable}
            />
            <AntDesign
              name="calendar"
              size={30}
              color="black"
              onPress={() => showDatePicker("end")}
            />
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        is30Hour={true}
      />
      <Text style={styles.textOnDate}>Isi Atensi : </Text>
      <TextInput
        multiline
        numberOfLines={10}
        style={styles.inputNote}
        onChangeText={handleNoteChanges}
        value={isiAtensi}
      />
      <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
        <Text style={styles.buttonText}>Buat Atensi</Text>
        <Ionicons name="chevron-forward-outline" color={"#FFF"} size={20} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Atensi;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
  dateTimeContainer: {
    flexDirection: "row",
  },
  dateOnStart: {
    width: "100%",
  },
  textOnDate: {
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  },

  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF5FF",
    borderRadius: 7,
  },
  inputDisable: {
    width: "90%",
    marginRight: 5,
    fontSize: 20,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
  },
  closeIcon: {
    fontSize: 30,
  },
  inputNote: {
    backgroundColor: "#EEF5FF",
    padding: 5,
    marginVertical: 5,
    fontSize: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#088395",
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    width: "90%",
  },
});
