import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAtensi } from "../api/atensi";
import { DateFormat } from "../utils/DateFormat";
import ModalLoading from "./ModalLoading";

const ListAtensi = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["atensi"],
    queryFn: getAtensi,
  });

  return (
    <View style={styles.container}>
      {isLoading && <ModalLoading />}

      {data && data.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            Tidak ada atensi yang ditampilkan
          </Text>
        </View>
      )}
      {data &&
        data.map((data, id) => {
          return (
            <View style={styles.atensiContainer} key={id}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{data.judul_atensi}</Text>
              </View>
              <View style={styles.dateContainer}>
                <View style={styles.dateView}>
                  <Text style={styles.dateText}>
                    {DateFormat(data.tanggal_mulai)} {""}
                  </Text>
                  <Text style={styles.dateText}>
                    - {DateFormat(data.tanggal_selesai)}
                  </Text>
                </View>
              </View>
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{data.catatan}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  atensiContainer: {
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    height: "auto",
    borderWidth: 2,
    borderColor: "#FEC100",
  },
  noDataContainer: {},
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#FEC100",
  },
  headerContainer: {
    marginVertical: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  dateContainer: {
    marginVertical: 5,
  },
  dateView: {
    flexDirection: "row",
  },
  dateText: { fontSize: 18, fontWeight: "bold" },
  noteContainer: {},
  noteText: {
    fontSize: 17,
  },
});

export default ListAtensi;
