import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { DateFormat, TimeFormat } from "../utils/DateFormat";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/userContext";
import ModalLoading from "../components/ModalLoading";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import { getUserAtensi } from "../api/atensi";
import ModalDeleteAtensi from "../components/Modal/ModalDeleteAtensi";
const RiwayatAtensi = () => {
  const { id } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isdelete, setIsDelete] = useState([]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["data_atensi", id],
    queryFn: () => getUserAtensi(id),
  });

  const handleDetail = (data) => {
    navigation.navigate("Detail Atensi", { data: data });
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
        {isLoading && <ModalLoading />}
        {data && data.length === 0 && (
          <View style={styles.dataNotFoundContainer}>
            <Entypo name="warning" size={24} color="red" />
            <Text style={styles.dataNotFoundText}>
              Tidak ada data yang ditemukan
            </Text>
          </View>
        )}
        {data &&
          data.length > 0 &&
          sortByCreatedAtDesc(data).map((data, id) => {
            return (
              <View style={styles.card} key={id}>
                <View style={styles.rowFlexEnd}>
                  <View style={styles.labelContainer}>
                    <Text style={[styles.text, { fontSize: 18 }]}>
                      {DateFormat(data.createdAt)}
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        { fontSize: 18, fontWeight: "bold" },
                      ]}
                    >
                      {TimeFormat(data.createdAt)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Entypo
                    name="new-message"
                    size={35}
                    color={"#088395"}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>{data.judul_atensi}</Text>
                </View>
                <View style={styles.row}>
                  <FontAwesome
                    name="calendar-check-o"
                    size={35}
                    color={"#088395"}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {DateFormat(data.tanggal_mulai)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <FontAwesome
                    name="calendar-times-o"
                    size={35}
                    color={"#088395"}
                    style={styles.icon}
                  />
                  <Text style={[styles.text, { fontSize: 18 }]}>
                    {DateFormat(data.tanggal_selesai)}
                  </Text>
                </View>

                <View style={[styles.row, { justifyContent: "flex-end" }]}>
                  <TouchableOpacity onPress={() => handleDetail(data)}>
                    <Text style={[styles.button, styles.detailButton]}>
                      <Entypo name="chevron-with-circle-right" size={24} />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(data)}>
                    <Text style={[styles.button, styles.deleteButton]}>
                      <Ionicons name="trash-outline" size={25} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

        {isdelete && (
          <ModalDeleteAtensi
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
  },
  errorSection: {
    padding: 15,
    backgroundColor: "#FF4444",
    borderRadius: 10,
  },
  errorText: {
    color: "#FFF",
    fontSize: 18,
  },
  dataNotFoundContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10, // Adjust as needed
  },
  dataNotFoundText: {
    fontSize: 20,
    color: "red", // Adjust color as needed
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
  icon: {
    width: 40,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginHorizontal: 5,
    maxWidth: 200,
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
    fontSize: 16,
  },
  editButton: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
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

export default RiwayatAtensi;
