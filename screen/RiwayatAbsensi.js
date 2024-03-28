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
import { Ionicons } from "@expo/vector-icons";
import { DateFormat } from "../utils/DateFormat";
import { useNavigation } from "@react-navigation/native";
import ModalDelete from "../components/Modal/ModalDelete";
import { useAuth } from "../context/userContext";
import { getUserAbsen } from "../api/absensi";
import ModalLoading from "../components/ModalLoading";
import { Entypo } from "@expo/vector-icons";

const RiwayatAbsensi = () => {
  const { id } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isdelete, setIsDelete] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["data", id],
    queryFn: () => getUserAbsen(id),
  });

  const handleDetail = (data) => {
    navigation.navigate("DetailAbsensi", { data: data });
  };

  const handleDelete = (data) => {
    setIsDelete(data);
    setModalVisible(true);
    setIsEdit(true);
  };

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contentContainer}>
        {isPending && <ModalLoading />}
        {data && data.length === 0 && (
          <View style={styles.dataNotFoundContainer}>
            <Entypo name="warning" size={24} color="red" />
            <Text style={styles.dataNotFoundText}>
              Tidak ada data yang ditemukan
            </Text>
          </View>
        )}
        {data &&
          data.map((data, id) => {
            return (
              <View style={styles.card} key={id}>
                <View style={styles.rowFlexEnd}>
                  <View style={styles.labelContainer}>
                    <Text style={[styles.text, { fontSize: 18 }]}>
                      {DateFormat(data.createdAt)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={30}
                    color={"#088395"}
                  />
                  <Text style={styles.text}>
                    {data.latitude}, {data.longitude}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={30}
                    color={"#088395"}
                  />
                  <Text style={styles.text}>{data.lokasi_absen}</Text>
                </View>

                <View style={[styles.row, { justifyContent: "flex-end" }]}>
                  <TouchableOpacity onPress={() => handleDetail(data)}>
                    <Text style={[styles.button, styles.deleteButton]}>
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
    width: "70%",
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
    fontSize: 16,
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
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RiwayatAbsensi;
