import React from "react";
import {
  ImageBackground,
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
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("BottomTabBar");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <ImageBackground
          source={require("../assets/5051402.jpg")}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 400,
          }}
        />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.desc}>Tracking Location App</Text>
        <View style={styles.formBox}>
          <View>
            <TextInput
              placeholder="Masukkan Username"
              style={styles.formInput}
            />
            <TextInput
              placeholder="Masukkan Password"
              style={styles.formInput}
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 26,
    marginLeft: 30,
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
    height: 50,
    borderRadius: 20,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
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
