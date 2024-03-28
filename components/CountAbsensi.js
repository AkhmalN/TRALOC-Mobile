import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CountAbsensi = ({ isLoading, value }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Riwayat Absensi"); // Replace "NamaHalamanTujuan" with the name of the target screen
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.textLength}>
        <Text style={styles.textName}>Riwayat Absensi</Text>
        <Text style={styles.countText}>
          {isLoading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <Text>{value}</Text>
          )}
        </Text>
      </View>
      <View>
        <Ionicons name="walk-outline" size={30} color={"#FFF"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#8E8FFA",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textLength: {
    flexDirection: "column",
    justifyContent: "center",
  },
  textName: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
  countText: {
    fontSize: 16,
  },
});

export default CountAbsensi;
