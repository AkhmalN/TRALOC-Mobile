import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LocationScanner } from "../utils/LocationScanner";
import {
  askForCameraPermission,
  renderPermissionMessage,
} from "../permission/CameraPermission";
import { addPatroli } from "../api/patroli";
import { Notifikasi } from "../components/Notifikasi";

export default function Patroli({ route }) {
  const navigation = useNavigation();
  const { savedPhoto } = route ? route.params || {} : {};
  const [hasPermission, setHasPermission] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [scanedData, setScannedData] = useState(false);
  const [items, setItems] = useState([
    "Aman",
    "Demonstrasi",
    "Kebakaran",
    "Pencurian",
  ]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [scannedLatitude, setScannedLatitude] = useState();
  const [scannedLongitude, setScannedLongitude] = useState();
  const [scannedLabel, setScannedLabel] = useState();
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setIsSuccess] = useState("");
  const [error, setError] = useState("");
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);

  useEffect(() => {
    if (savedPhoto) {
      setImages([savedPhoto]);
    }
  }, [savedPhoto]);

  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((ID) => {
        if (ID) {
          setUserId(ID);
        }
      })
      .catch((error) => {});
    AsyncStorage.getItem("username")
      .then((value) => {
        if (value) {
          setUsername(value);
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permissionStatus = await askForCameraPermission();
      setHasPermission(permissionStatus);
    };
    requestCameraPermission();
  }, []);
  const handleRequestCameraPermission = async () => {
    const permissionStatus = await askForCameraPermission();
    setHasPermission(permissionStatus);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };

  const hideNotifikasi = () => {
    setNotifikasiVisible(false);
  };

  const handleBarCodeScanner = ({ data }) => {
    LocationScanner({
      data,
      setScannedData,
      setScannedLatitude,
      setScannedLongitude,
      setScannedLabel,
    });
  };
  const handleOnSubmit = async () => {
    setLoading(true);
    try {
      const response = await addPatroli({
        userId,
        username,
        scannedLabel,
        selectedItem,
        notes,
        scannedLatitude,
        scannedLongitude,
        savedPhoto,
      });
      if (response) {
        setLoading(false);
        setIsSuccess(true);
        setNotifikasiVisible(true);
        setTimeout(() => {
          setNotifikasiVisible(false);
        }, 5000);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {renderPermissionMessage(hasPermission, handleRequestCameraPermission)}
      {success && notifikasiVisible && (
        <Notifikasi
          message={"Berhasil mengirim patroli"}
          hideModal={hideNotifikasi}
        />
      )}

      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanedData ? undefined : handleBarCodeScanner}
          style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
            height: 400,
            width: 400,
          }}
        />
        <Text style={styles.overlayBarcode}>Dekatkan camera ke barcode</Text>
      </View>
      {scanedData && (
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title={"Scan Ulang ?"}
            onPress={() => setScannedData(false)}
            color={"#cf352e"}
          />
        </View>
      )}
      <View style={styles.formBox}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="remove-outline" color={"#FFF"} size={50} />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Lokasi</Text>

          <TouchableWithoutFeedback style={styles.formInput}>
            <View style={{ width: "100%" }}>
              {scannedLatitude !== undefined &&
              scannedLongitude !== undefined &&
              scannedLabel !== undefined ? (
                <Text style={styles.valueForm}>{scannedLabel}</Text>
              ) : (
                <Text style={{ fontSize: 18 }}>Scan Barcode Pada Pos</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.label}>Status</Text>
          <View style={styles.containerDropdown}>
            <TouchableOpacity onPress={toggleDropdown}>
              <View style={styles.dropdownToggle}>
                <View style={{ width: "80%" }}>
                  <Text style={styles.valueForm}>
                    {selectedItem || "Pilih status"}
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
            onChangeText={(text) => setNotes(text)}
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
                  style={{ width: 100, height: 70, borderRadius: 10 }}
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
        </View>
        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
          <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
            {loading ? (
              <>
                <Text>Mengirim</Text>
                <ActivityIndicator size={20} color={"#088395"} />
              </>
            ) : (
              <>
                <Text style={styles.buttonText}>Kirim Patroli</Text>
                <Ionicons
                  name="paper-plane-outline"
                  size={25}
                  style={styles.icon}
                />
              </>
            )}
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
  alertSuccess: {
    position: "absolute",
    backgroundColor: "#088395",
    padding: 10,
    borderRadius: 10,
    zIndex: 2,
    alignSelf: "center",
    marginTop: 10,
  },
  alertError: {
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  alertText: {
    fontSize: 19,
    color: "#FFF",
  },
  barcodeBox: {
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  overlayBarcode: {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    color: "white",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
  },
  valueForm: {
    fontSize: 18,
  },
  formBox: {
    backgroundColor: "#088395",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    height: 80,
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
    height: 120,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#EEF5FF",
    fontSize: 18,
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
