import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function TambahAktivitas() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"]; // Your dropdown items

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };
  return (
    <SafeAreaView style={styles.formBox}>
      <Text>Pos Jaga</Text>
      {/* ntar dropdown */}
      <View style={styles.container}>
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

      <Text>Tanggal Aktivitas</Text>
      <TextInput placeholder="Masukkan Password" style={styles.formInput} />
      <Text>Laporan Kegiatan</Text>
      <TextInput
        placeholder="Masukkan Password"
        style={styles.formInput}
        multiline={true}
        numberOfLines={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#DDDDDD",
  },
  dropdownToggle: {
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    height: 50,
    padding: 10,
  },
  dropdown: {
    position: "absolute",
    top: 40, // Adjust the top position as needed
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    maxHeight: 150,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
