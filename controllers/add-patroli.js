import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  askForCameraPermission,
  renderPermissionMessage,
} from "../permission/CameraPermission";
import { addPatroli } from "../api/patroli";
import { Notifikasi } from "../components/Notifikasi";
import { useAuth } from "../context/userContext";
import { getUser } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import ModalLoading from "../components/ModalLoading";

const { width, height } = Dimensions.get("window");

export default function Patroli({ route }) {
  const { id, user } = useAuth();
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
  const [notes, setNotes] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [namaInstansi, setNamaInstansi] = useState("");
  const [lokasiBarcode, setLokasiBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setIsSuccess] = useState("");
  const [error, setError] = useState("");
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);
  const [isBarcode, setIsBarcode] = useState(true);

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

  const { isLoading, data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  if (isLoading) {
    return <ModalLoading />;
  }
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
    if (data) {
      setIsBarcode(false);
      const { namaInstansi, lokasiBarcode } = JSON.parse(data);

      setNamaInstansi(namaInstansi);
      setLokasiBarcode(lokasiBarcode);
    }
  };
  const handleOnSubmit = async () => {
    setLoading(true);
    try {
      const response = await addPatroli({
        userId: id,
        user,
        namaLengkap: data.nama_lengkap,
        lokasiBarcode,
        namaInstansi,
        selectedItem,
        notes,
        savedPhoto,
      });
      if (response) {
        setLoading(false);
        setIsSuccess(true);
        setNotifikasiVisible(true);
        setTimeout(() => {
          setNotifikasiVisible(false);
          navigation.navigate("Home");
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

      {isBarcode && (
        <View
          style={[styles.barcodeBox, { height: height * 0.5, width: width }]}
        >
          <BarCodeScanner
            onBarCodeScanned={scanedData ? undefined : handleBarCodeScanner}
            style={{
              flex: 1,
            }}
          />
          <Text style={styles.overlayBarcode}>Dekatkan camera ke barcode</Text>
        </View>
      )}

      <View style={styles.formBox}>
        {isBarcode === false && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setIsBarcode(true)}
            >
              <Text style={styles.scanButtonText}>Scan Ulang</Text>
              <Feather name="refresh-cw" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Lokasi Pos</Text>

          <TouchableWithoutFeedback style={styles.formInput}>
            <View style={{ width: "100%" }}>
              {lokasiBarcode ? (
                <Text style={styles.valueForm}>{lokasiBarcode}</Text>
              ) : (
                <Text style={{ fontSize: 18 }}>Scan Barcode Pada Pos</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Instansi Patroli</Text>

          <TouchableWithoutFeedback style={styles.formInput}>
            <View style={{ width: "100%" }}>
              {namaInstansi ? (
                <Text style={styles.valueForm}>{namaInstansi}</Text>
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
          <Text style={styles.label}>Capture Dokumen</Text>
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
                <Text style={styles.buttonText}>Mengirim</Text>
                <ActivityIndicator size={20} color={"#FFF"} />
              </>
            ) : (
              <>
                <Text style={styles.buttonText}>Kirim Patroli</Text>
                <Ionicons
                  name="paper-plane-outline"
                  size={25}
                  style={styles.icon}
                  color={"#FFF"}
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
    backgroundColor: "#FFF",
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
    left: "35%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    color: "white",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  label: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
  },
  valueForm: {
    fontSize: 18,
  },
  formBox: {
    marginTop: 10,
  },
  scanButton: {
    backgroundColor: "#FC676B",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  scanButtonText: {
    color: "#FFF",
    fontSize: 18,
    marginHorizontal: 10,
  },
  formInput: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#E6F4FF",
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
    backgroundColor: "#E6F4FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  formCatatan: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#E6F4FF",
    fontSize: 20,
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
    backgroundColor: "#E6F4FF",
    borderRadius: 10,
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
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#44B6C7",
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});
