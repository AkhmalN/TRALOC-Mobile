import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("BottomTabBar");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <ImageBackground
          source={require("../assets/Universitas_Nasional_Logo.png")}
          resizeMode="cover"
          style={{
            width: 300,
            height: 380,
            marginLeft: 30,
          }}
        />
        <Text style={styles.title}>Login</Text>
        <View style={styles.formBox}>
          <KeyboardAvoidingView behavior="padding">
            <View>
              <TextInput
                placeholder="Masukkan Username"
                style={styles.formInput}
                value={email}
                onChange={(text) => setEmail(text)}
              />
              <TextInput
                placeholder="Masukkan Password"
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
          </KeyboardAvoidingView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    marginLeft: 35,
  },
  desc: {
    fontSize: 15,
    marginLeft: 30,
  },
  formBox: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
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
