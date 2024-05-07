import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/userContext";
import { getUser } from "../api/users";
import ModalLoading from "../components/ModalLoading";
import { useQuery } from "@tanstack/react-query";

const DataPribadi = () => {
  const { id } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["data", id],
    queryFn: () => getUser(id),
  });

  if (isLoading) return <ModalLoading />;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.sectionForm}>
          <Text style={styles.title}>Username : </Text>
          <View style={styles.form}>
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={"#088395"}
            />
            <TextInput
              value={data ? data.username : ""}
              style={styles.formInput}
            />
          </View>
          <Text style={styles.title}>Email : </Text>

          <View style={styles.form}>
            <MaterialCommunityIcons name="email" size={24} color={"#088395"} />
            <TextInput
              value={data ? data.email : ""}
              style={styles.formInput}
            />
          </View>
          <Text style={styles.title}>Password : </Text>

          <View style={styles.form}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              onPress={toggleShowPassword}
              color={"#088395"}
            />
            <TextInput
              value={data ? data.password : ""}
              secureTextEntry={!showPassword}
              style={styles.formInput}
            />
          </View>
          <Text style={styles.title}>NO HP : </Text>

          <View style={styles.form}>
            <MaterialCommunityIcons name="phone" size={24} color={"#088395"} />
            <TextInput
              value={data ? data.no_hp : ""}
              style={styles.formInput}
            />
          </View>
          <Text style={styles.title}>NIK : </Text>

          <View style={styles.form}>
            <MaterialCommunityIcons
              name="badge-account-horizontal-outline"
              size={24}
              color={"#088395"}
            />
            <TextInput value={data ? data.nik : ""} style={styles.formInput} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FF",
  },
  profileContainer: {
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
  title: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default DataPribadi;
