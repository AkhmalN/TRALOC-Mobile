import React from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Profil = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Sesuaikan perilaku sesuai platform
    >
      <ScrollView style={styles.container}>
        <View style={styles.sectionImage}>
          <Text style={styles.title}>Profil</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/userlogo.png")}
              style={{ width: 110, height: 110, borderRadius: 50 }}
            />
          </View>
        </View>
        <View style={styles.sectionForm}>
          <View style={styles.formBox}>
            <Text style={styles.label}>Username</Text>
            <TextInput placeholder="Lonnie Murphy" style={styles.form} />
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="LonnieMurphy@gmail.com"
              style={styles.form}
            />
            <Text style={styles.label}>Phone</Text>
            <TextInput placeholder="+6289089829928" style={styles.form} />
            <Text style={styles.label}>Male</Text>
            <TextInput placeholder="Male" style={styles.form} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionImage: {
    backgroundColor: "#16C79A",
    padding: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  sectionForm: {
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  form: {
    color: "#000000",
    fontWeight: "bold",
    width: "100%",
    borderRadius: 20,
    paddingLeft: 10,
    height: 60,
    backgroundColor: "#D8D9DA",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
});
