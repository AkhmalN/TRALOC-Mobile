import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CountActivity = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textLength}>
        <Text style={styles.textName}>Aktivitas</Text>
        <Text style={styles.countText}>0</Text>
      </View>
      <View>
        <Ionicons name="bicycle-outline" size={30} />
      </View>
    </View>
  );
};

export default CountActivity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#8CB9BD",
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
