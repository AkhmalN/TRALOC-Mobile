import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function AktivitasController({
  savedPhoto,
  toggleDropdown,
  selectedItem,
  dropdownVisible,
  items,
  selectItem,
  loading,
}) {
  const navigation = useNavigation();
  const [lokasi, setLokasi] = useState("");
  const [catatan, setCatatan] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (savedPhoto && savedPhoto.uri) {
      setImage(savedPhoto.uri);
    }
  }, [savedPhoto]);

  const handleSelectItem = (item) => {
    setLokasi(item.title);
    selectItem(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Lokasi Aktivitas</Text>
        <View style={styles.formInput}>
          <TouchableOpacity onPress={toggleDropdown}>
            <Text style={styles.dropdownToggle}>
              {selectedItem || "Pilih Lokasi"}
            </Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              {loading ? ( // Show loading indicator while data is being fetched
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <FlatList
                  data={items}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectItem(item)}>
                      <Text style={styles.dropdownItem}>{item.title}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        </View>
        <Text>Catatan Aktivitas</Text>
        <TextInput
          placeholder="Masukkan Catatan"
          style={styles.formCatatan}
          maxLength={200}
          multiline={true}
          onChangeText={(text) => setCatatan(text)}
        />
        <Text>Gambar (min 1)</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ActivityCamera")}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Ionicons name="camera-outline" size={70} />
            {savedPhoto && (
              <Image
                source={{ uri: savedPhoto.uri }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginLeft: 5,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kirim</Text>
          <Ionicons name="chevron-forward-outline" color={"#FFF"} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
  },
  formInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  box: {
    padding: 20,
    height: "65%",
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  dropdownToggle: {
    backgroundColor: "#EEF5FF",
    borderRadius: 10,
    height: 50,
    padding: 15,
  },
  formCatatan: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#EEF5FF",
  },
  dropdown: {
    position: "absolute",
    top: 40, // Adjust the top position as needed
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    maxHeight: 150,
    zIndex: 3,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    flexDirection: "row",
    textAlign: "right",
    width: "100%",
    height: 50,
    backgroundColor: "#088395",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});
