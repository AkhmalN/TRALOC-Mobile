import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateFormat } from "../utils/DateFormat";
import { baseUrl } from "../api/apiConfig";
import { ActivityIndicator } from "react-native";
import axios from "axios";

const Profil = () => {
  const [dataUser, setDataUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((ID) => {
        if (ID) {
          setUserId(ID);
        }
      })
      .catch((error) => {
        setError("Error fetching user ID:", error);
      });
  }, []);

  const getUserData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://192.168.100.123:8083/api/v1/users/${userId}`
      );
      if (response.status === 200) {
        setDataUser(response.data.user);
        setLoading(false);
      } else {
        throw new Error("Unexpected response status:", response.status);
      }
    } catch (error) {
      throw new Error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.sectionForm}>
          <View style={styles.form}>
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={"#088395"}
            />
            <TextInput
              value={loading ? "" : dataUser ? dataUser.username : ""}
              style={styles.formInput}
            />
          </View>
          <View style={styles.form}>
            <MaterialCommunityIcons name="email" size={24} color={"#088395"} />
            <TextInput
              value={loading ? "" : dataUser ? dataUser.email : ""}
              style={styles.formInput}
            />
          </View>
          <View style={styles.form}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              onPress={toggleShowPassword}
              color={"#088395"}
            />
            <TextInput
              value={loading ? "" : dataUser ? dataUser.password : ""}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.formInput}
            />
          </View>
          <View style={styles.form}>
            <MaterialCommunityIcons name="phone" size={24} color={"#088395"} />
            <TextInput
              value={loading ? "" : dataUser ? dataUser.no_hp : ""}
              style={styles.formInput}
            />
          </View>
          <View style={styles.form}>
            <MaterialCommunityIcons
              name="badge-account-horizontal-outline"
              size={24}
              color={"#088395"}
            />
            <TextInput
              value={loading ? "" : dataUser ? dataUser.nik : ""}
              style={styles.formInput}
            />
          </View>
          <View style={[styles.form, { alignItems: "center" }]}>
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={24}
              color={"#088395"}
            />
            <View style={[styles.formInput, { flexDirection: "row" }]}>
              <Text style={{ fontSize: 20, marginTop: 5 }}>
                {loading
                  ? ""
                  : dataUser
                  ? DateFormat(dataUser.tanggal_lahir)
                  : ""}{" "}
                |
              </Text>
              <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 5 }}>
                {loading ? "" : dataUser ? dataUser.tempat_lahir : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FF",
  },
  banner: {
    width: "100%",
    borderBottomLeftRadius: 600,
    borderBottomRightRadius: 600,
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    height: "15%",
  },
  imageContainer: {
    zIndex: 1,
    position: "absolute",
    top: "45%",
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  sectionForm: {
    padding: 20,
  },
  formInput: {
    color: "#000000",
    width: "100%",
    borderRadius: 20,
    paddingLeft: 10,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  form: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 10,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitForm: {
    marginTop: 20,
    backgroundColor: "#088395",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  submitText: {
    color: "#FFF",
    fontSize: 16,
  },
  title: {
    marginTop: 10,
    fontSize: 25,
  },
});
