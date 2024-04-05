import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Organize by Administrasi Umum Unas </Text>
      <Ionicons name="ribbon-outline" size={25} color={"grey"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: "grey",
  },
});

export default Footer;
