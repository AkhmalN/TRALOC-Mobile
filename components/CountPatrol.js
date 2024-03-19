import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserPatroliLength } from "../api/patroli";

const CountPatrol = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataPatroli, setDataPatroli] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((ID) => {
        setUserId(ID);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getdataPatroli = async () => {
    setIsLoading(true);
    try {
      const response = await getUserPatroliLength(userId);
      setDataPatroli(response);

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdataPatroli();
  }, [userId]);
  return (
    <View style={styles.container}>
      <View style={styles.textLength}>
        <Text style={styles.textName}>Patroli</Text>
        <Text style={styles.countText}>
          {isLoading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            dataPatroli.length
          )}
        </Text>
      </View>
      <View>
        <Ionicons name="shield-checkmark-outline" size={30} />
      </View>
    </View>
  );
};

export default CountPatrol;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#B7C9F2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    width: "35%",
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
