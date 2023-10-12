import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function FormPatrol({ route }) {
  const { scanedData } = route.params;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    "Aman",
    "Demonstrasi",
    "Kebakaran",
    "Pencurian",
  ]); // Your dropdown items

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Lokasi Anda Saat ini {scanedData}</Text>
      <Text>Waktu : 12/10/2023</Text>
      <View>
        <Text>Lokasi</Text>
        <TextInput placeholder={scanedData} style={styles.formInput} />
        <Text>Status</Text>
        <View style={styles.containerDropdown}>
          <TouchableOpacity onPress={toggleDropdown}>
            <Text style={styles.dropdownToggle}>
              {selectedItem || "Select an item"}
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
        <Text>Catatan</Text>
        <TextInput placeholder="Masukkan Catatan" style={styles.formInput} />
        <Text>Dokumentasi</Text>
        <TextInput
          placeholder="Masukkan Dokumentasi"
          style={styles.formInput}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Input</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  dropdownToggle: {
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    height: 50,
    padding: 10,
    width: 300,
  },
  dropdown: {
    position: "absolute",
    top: 40, // Adjust the top position as needed
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    width: 300,
    maxHeight: 400,
    zIndex: 1,
  },
  dropdownItem: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
