import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { DateFormat, TimeFormat } from "../utils/DateFormat";
import { useNavigation } from "@react-navigation/native";
import ModalDelete from "../components/Modal/ModalDelete";
import { useAuth } from "../context/userContext";
import { getUserAbsen } from "../api/absensi";
import ModalLoading from "../components/ModalLoading";
import { ICON_COLOR, TEXT_COLOR } from "../constant/color";

const RiwayatAbsensi = () => {
  const { id } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isdelete, setIsDelete] = useState(null);

  const { isPending, isError, data } = useQuery({
    queryKey: ["data_absensi", id],
    queryFn: () => getUserAbsen(id),
  });

  const handleDetail = (data) => {
    navigation.navigate("DetailAbsensi", { data: data });
  };

  const handleDelete = (data) => {
    setIsDelete(data);
    setModalVisible(true);
  };

  const sortByCreatedAtDesc = (data) => {
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contentContainer}>
        {isError && (
          <View style={styles.errorSection}>
            <Text style={styles.errorText}>
              Terjadi masalah pada server, Ulangi!
            </Text>
          </View>
        )}
        {isPending && <ModalLoading />}

        {data && data.length > 0 ? (
          data &&
          sortByCreatedAtDesc(data).map((data, id) => {
            return (
              <View style={styles.card} key={id}>
                <View style={styles.rowFlexEnd}>
                  <View style={styles.labelContainer}>
                    <Text style={[styles.text, { fontSize: 18 }]}>
                      {DateFormat(data.createdAt)}
                    </Text>
                    <FontAwesome5
                      name="arrow-circle-right"
                      size={24}
                      color={ICON_COLOR.danger}
                    />
                    <Text style={[styles.text, { fontSize: 18 }]}>
                      {DateFormat(data.updatedAt)}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons
                    name="office-building"
                    size={30}
                    color={"#088395"}
                  />
                  <Text style={styles.text}>{data.lokasi_absen}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons name="timer" size={30} color={ICON_COLOR.primary} />
                  <Text style={styles.text}>
                    Masuk :{" "}
                    {data.checkInTime ? TimeFormat(data.checkInTime) : "-"}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Ionicons name="timer" size={30} color={ICON_COLOR.danger} />
                  <Text style={[styles.text]}>
                    Keluar :
                    {data.checkOutTime ? TimeFormat(data.checkOutTime) : "  -"}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>
                    Total Jam Kerja :
                    {data.total_jam_kerja ? data.total_jam_kerja : "  -"}
                  </Text>
                </View>

                <View style={[styles.row, { justifyContent: "flex-end" }]}>
                  <TouchableOpacity onPress={() => handleDelete(data)}>
                    <Text style={[styles.button, styles.deleteButton]}>
                      <Ionicons name="trash-outline" size={25} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.dataNotFoundContainer}>
            <Entypo name="warning" size={24} color="red" />
            <Text style={styles.dataNotFoundText}>
              Tidak ada data yang ditemukan
            </Text>
          </View>
        )}

        {isdelete && (
          <ModalDelete
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            data={isdelete}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dataNotFoundContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10, // Adjust as needed
  },
  dataNotFoundText: {
    fontSize: 20,
    color: TEXT_COLOR.danger, // Adjust color as needed
    marginHorizontal: 10,
  },
  card: {
    width: "90%",
    backgroundColor: "#ecf0f6",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  rowFlexEnd: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    height: 30,
  },
  labelContainer: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelContainerStatus: {
    width: "30%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  textStatus: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    marginRight: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  editButton: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: TEXT_COLOR.danger,
    color: "#fff",
  },
  detailButton: {
    backgroundColor: "#088395",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RiwayatAbsensi;
