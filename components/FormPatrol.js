import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function FormPatrol({ route }) {
  const navigation = useNavigation();
  const { scanedData, savedPhoto } = route.params;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    "Aman",
    "Demonstrasi",
    "Kebakaran",
    "Pencurian",
  ]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={[styles.label, { textAlign: "center", fontSize: 18 }]}>
          Anda Akan membuat laporan patroli dengan Lokasi Anda Saat ini
          {scanedData}
        </Text>

        <View>
          <Text style={styles.label}>Lokasi</Text>
          <View style={styles.formInput}>
            <Text>{scanedData}</Text>
          </View>
          <Text style={styles.label}>Status</Text>
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
          <Text style={styles.label}>Catatan</Text>
          <TextInput
            placeholder="Masukkan Catatan"
            style={styles.formCatatan}
            maxLength={200}
            multiline={true}
          />
          <Text style={styles.label}>Masukkan Gambar (Min 1)</Text>
          <TouchableOpacity
            style={styles.formInput}
            onPress={() => navigation.navigate("PatrolCamera")}
          >
            {savedPhoto && (
              <Image
                source={{ uri: savedPhoto.uri }}
                style={{ width: 50, height: 40 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View>
              <Text style={styles.buttonText}>Input</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  label: {
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 10,
  },
  formBox: {
    backgroundColor: "#3C486B",
    borderRadius: 20,
    padding: 10,
  },
  formInput: {
    width: 350,
    height: 70,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
  },
  formCatatan: {
    width: 350,
    height: 120,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
  },
  formImage: {
    height: 80,
    width: 350,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
  },
  docIcon: {
    width: 30,
    height: 30,
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
    height: 60,
    padding: 10,
    width: 350,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    width: 350,
    maxHeight: 400,
    zIndex: 1,
    borderRadius: 20,
  },
  dropdownItem: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 20,
    marginTop: 10,
    fontSize: 16,
  },
});
