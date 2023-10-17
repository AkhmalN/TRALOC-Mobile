import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("BottomTabBar");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.formBox}>
          <Text style={styles.title}>Login</Text>
          <View>
            <Text>Masukkan Username / email</Text>
            <TextInput
              placeholder="Username/email"
              style={styles.formInput}
              value={email}
              onChange={(text) => setEmail(text)}
            />
            <Text>Masukkan Password</Text>
            <TextInput
              placeholder="Password"
              style={styles.formInput}
              value={password}
              onChange={(text) => setPassword(text)}
              secureTextEntry
            />
            <Text style={styles.forgot}>Lupa kata sandi ?</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={handleLogin}>
                Masuk
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 30,
  },
  formBox: {
    marginTop: 10,
  },
  formInput: {
    width: 300,
    height: 50,
    borderRadius: 20,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
  },
  forgot: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: "#6499E9",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 20,
    width: 200,
    backgroundColor: "#6499E9",
  },
  buttonText: {
    padding: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
