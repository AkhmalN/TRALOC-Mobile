import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";

export default function Patroli({ route }) {
  const navigation = useNavigation();
  const { savedPhoto } = route ? route.params || {} : {};
  const [hasPersmission, setHasPermission] = useState(null);
  const [scanedData, setScannedData] = useState(false);
  const [scannedLatitude, setScannedLatitude] = useState();
  const [scannedLongitude, setScannedLongitude] = useState();
  const [scannedLabel, setScannedLabel] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    "Aman",
    "Demonstrasi",
    "Kebakaran",
    "Pencurian",
  ]);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  if (hasPersmission === null) {
    return (
      <View style={styles.container}>
        <Text>Aplikasi Menunggu Persetujuan Akses Kamera</Text>
      </View>
    );
  }

  if (hasPersmission === false) {
    return (
      <View style={styles.container}>
        <Text>Aplikasi Tidak Mendapat Akses Kamera</Text>
        <Button
          title={"Setujui Akses"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };

  const handleBarCodeScanner = ({ type, data }) => {
    setScannedData(true);
    console.log(`Type = ${type}`);
    const coordinatesMatch = data.match(/-?\d+\.\d+/g);
    if (coordinatesMatch && coordinatesMatch.length >= 2) {
      const latitude = parseFloat(coordinatesMatch[0]);
      setScannedLatitude(latitude);
      const longitude = parseFloat(coordinatesMatch[1]);
      setScannedLongitude(longitude);
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
      console.log("Koordinat geografis tidak ditemukan.");
    }

    // Ekstrak string kueri (query)
    const queryMatch = data.match(/\?q=(.*)/);
    if (queryMatch && queryMatch.length > 1) {
      const query = decodeURIComponent(queryMatch[1]);
      setScannedLabel(query);
      console.log(`Label: ${query}`);
    } else {
      console.log("String kueri tidak ditemukan.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanedData ? undefined : handleBarCodeScanner}
          style={{
            flex: 1,
            alignSelf: "center", // Align the scanner horizontally center
            justifyContent: "center", // Center the content vertically
            height: 600, // Adjust the height as needed
            width: 600, // Adjust the width as needed
          }}
        />
      </View>
      {scanedData && (
        <Button
          title={"Scan Ulang ?"}
          onPress={() => setScannedData(false)}
          color={"tomato"}
        />
      )}
      <View style={styles.formBox}>
        <Text style={styles.label}>Lokasi</Text>

        <TouchableOpacity style={styles.formInput}>
          <View style={{ width: "100%" }}>
            {scannedLatitude !== undefined &&
            scannedLongitude !== undefined &&
            scannedLabel !== undefined ? (
              <Text style={styles.valueForm}>
                {scannedLatitude} {scannedLongitude} ({scannedLabel})
              </Text>
            ) : (
              <Text>Scan Barcode Pada Pos</Text>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.label}>Status</Text>
        <View style={styles.containerDropdown}>
          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.dropdownToggle}>
              <View style={{ width: "80%" }}>
                <Text style={styles.valueForm}>
                  {selectedItem || "Select an item"}
                </Text>
              </View>
              <View>
                <Image
                  source={require("../assets/icon/Expand_down.png")}
                  style={styles.docIcon}
                />
              </View>
            </View>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              {items.map((item) => (
                <TouchableOpacity key={item} onPress={() => selectItem(item)}>
                  <Text style={styles.dropdownItem}>{item}</Text>
                </TouchableOpacity>
              ))}
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
          style={savedPhoto ? styles.formHasImage : styles.formInput}
          onPress={() => navigation.navigate("PatrolCamera")}
        >
          <View>
            {savedPhoto && (
              <Image
                source={{ uri: savedPhoto.uri }}
                style={{ width: 100, height: 90, borderRadius: 20 }}
              />
            )}
          </View>
          <View>
            <Image
              source={require("../assets/icon/Camera.png")}
              style={styles.docIcon}
            />
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Kirim Patroli</Text>
            <Ionicons
              name="paper-plane-outline"
              size={25}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  barcodeBox: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 10,
  },
  valueForm: {
    fontSize: 16,
  },
  formBox: {
    backgroundColor: "#088395",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  formInput: {
    width: "100%",
    height: 60,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#EEF5FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formHasImage: {
    width: "100%",
    height: 100,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#EEF5FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  formCatatan: {
    width: "100%",
    height: 100,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#EEF5FF",
  },
  formImage: {
    height: 80,
    width: "100%",
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
  dropdownToggle: {
    backgroundColor: "#EEF5FF",
    borderRadius: 20,
    height: 60,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  dropdown: {
    position: "absolute",
    top: 55,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
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
  button: {
    flexDirection: "row",
    backgroundColor: "#EEF5FF",
    height: 50,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#092635",
    fontSize: 16,
  },
});
