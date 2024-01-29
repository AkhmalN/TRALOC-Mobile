import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { formatDate } from "../components/Options";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Aktivitas({ route }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([
    "Pos 1",
    "Pos 2",
    "Pos 3",
    "Pos 4",
    "Pos 5",
    "Pos 6",
  ]); // Your dropdown items
  const [lokasi, setLokasi] = useState("");
  const [Catatan, setCatatan] = useState("");

  const { savedPhoto } = route ? route.params || {} : {};

  const navigation = useNavigation();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    console.log(selectedItem);
    setDropdownVisible(false);
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
              <FlatList
                data={items}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => selectItem(item)}>
                    <Text style={styles.dropdownItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <Text>Catatan Aktivitas</Text>
        <TextInput
          placeholder="Masukkan Catatan"
          style={styles.formCatatan}
          maxLength={200}
          multiline={true}
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
    height: "55%",
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
