import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserAbsenLength } from "../api/absensi";

const CountAbsensi = ({ isLoading, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textLength}>
        <Text style={styles.textName}>Absensi</Text>
        <Text style={styles.countText}>
          {isLoading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <Text>{value}</Text>
          )}
        </Text>
      </View>
      <View>
        <Ionicons name="walk-outline" size={30} />
      </View>
    </View>
  );
};

export default CountAbsensi;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EEA5A6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    width: "28%",
    borderRadius: 10,
  },
  textName: {
    marginBottom: 10,
    fontSize: 16,
  },
  countText: {
    fontSize: 30,
  },
});
