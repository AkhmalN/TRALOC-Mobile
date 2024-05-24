import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { addPatroli } from "../api/patroli";
import { Notifikasi } from "../components/Notifikasi";
import { useAuth } from "../context/userContext";
import { getUser } from "../api/users";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ModalLoading from "../components/ModalLoading";
import { CameraView, Camera } from "expo-camera/next";

export default function Patroli({ route }) {
  const queryClient = useQueryClient();
  const { id, user } = useAuth();
  const navigation = useNavigation();
  const { savedPhoto } = route ? route.params || {} : {};
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [namaInstansi, setNamaInstansi] = useState("");
  const [lokasiBarcode, setLokasiBarcode] = useState("");
  const [images, setImages] = useState([]);
  const [items] = useState(["Aman", "Demonstrasi", "Kebakaran", "Pencurian"]);
  const [notes, setNotes] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setIsSuccess] = useState("");
  const [error, setError] = useState("");
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [emptyField, setEmptyField] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useEffect(() => {
    if (savedPhoto && savedPhoto.uri) {
      const newImages = [...images, savedPhoto.uri];

      setImages(newImages);
    }
  }, [savedPhoto]);
  const { isLoading: isLoadingUser, data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  const createPatroli = useMutation({
    mutationFn: addPatroli,
    onSuccess: async (response) => {
      setLoading(false);
      setIsSuccess(true);
      setNotifikasiVisible(true);
      setTimeout(() => {
        setNotifikasiVisible(false);
        navigation.navigate("Home");
      }, 2000);
      await queryClient.refetchQueries(["data_patroli", id]);
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
      setNotifikasiVisible(true);
      setError(error);
      setTimeout(() => {
        setNotifikasiVisible(false);
        setError("");
      }, 2000);
    },
  });

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
  const handleQrScanner = ({ data }) => {
    let parseData = JSON.parse(data);
    setNamaInstansi(parseData.namaInstansi);
    setLokasiBarcode(parseData.lokasiBarcode);
    setScanResult({ data });
    if (scanResult) {
      setScanned(false);
    }
  };
  const handleQrCode = () => {
    setScanned(true);
  };
  const handleToCamera = () => {
    if (images.length >= 4) {
      alert("Melebihi maksimal foto yang disarankan");
    } else {
      navigation.navigate("PatrolCamera");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleOnSubmit = async () => {
    setLoading(true);
    if (
      namaInstansi === "" ||
      lokasiBarcode === "" ||
      notes === "" ||
      savedPhoto === undefined
    ) {
      setEmptyField(true);
      setNotifikasiVisible(true);
      setLoading(false);
      setTimeout(() => {
        setEmptyField(false);
        setNotifikasiVisible(false);
      }, 1500);
    } else {
      createPatroli.mutate({
        userId: id,
        user,
        namaLengkap: data.nama_lengkap,
        lokasiBarcode: lokasiBarcode,
        namaInstansi: namaInstansi,
        selectedItem,
        notes,
        savedPhoto: images,
      });
    }
    // try {
    //   const response = await addPatroli({
    //     userId: id,
    //     user,
    //     namaLengkap: data.nama_lengkap,
    //     lokasiBarcode: lokasiBarcode,
    //     namaInstansi: namaInstansi,
    //     selectedItem,
    //     notes,
    //     savedPhoto: images,
    //   });
    //   if (response) {
    //     setLoading(false);
    //     setIsSuccess(true);
    //     setNotifikasiVisible(true);
    //     setTimeout(() => {
    //       setNotifikasiVisible(false);
    //       navigation.navigate("Home");
    //     }, 5000);
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   setError(error);
    // }
  };

  return (
    <ScrollView style={styles.container}>
      {scanned && (
        <CameraView
          onBarcodeScanned={scanned ? handleQrScanner : undefined}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={{
            flex: 1,
            height: 500,
          }}
        />
      )}
      {scanned && (
        <View style={styles.faceOverlay}>
          <View style={[styles.topLeft, styles.border]} />
          <View style={[styles.topRight, styles.border]} />
          <View style={[styles.bottomLeft, styles.border]} />
          <View style={[styles.bottomRight, styles.border]} />
        </View>
      )}
      {success && notifikasiVisible && (
        <Notifikasi
          message={"Berhasil mengirim laporan patroli"}
          hideModal={hideNotifikasi}
        />
      )}
      {error && notifikasiVisible && (
        <Notifikasi
          message={"Terjadi Kesalahan dalam mengirim laporan patroli"}
          hideModal={hideNotifikasi}
        />
      )}
      {emptyField && notifikasiVisible && (
        <Notifikasi
          message={"Harap isi semua form yang tersedia!"}
          hideModal={hideNotifikasi}
        />
      )}
      {loading && <ModalLoading />}
      {isLoadingUser && <ModalLoading />}

      <View style={styles.formBox}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {!scanned && (
            <TouchableOpacity style={styles.scanButton} onPress={handleQrCode}>
              <Text style={styles.scanButtonText}>Scan Qr Code</Text>
              <Ionicons name="qr-code-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Lokasi Pos : </Text>

          <TouchableWithoutFeedback style={styles.formInput}>
            <View style={{ width: "100%" }}>
              {lokasiBarcode ? (
                <Text style={styles.valueForm}>{lokasiBarcode}</Text>
              ) : (
                <Text style={{ fontSize: 18 }}>Scan Barcode Pada Pos</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.label}>Instansi Patroli : </Text>

          <TouchableWithoutFeedback style={styles.formInput}>
            <View style={{ width: "100%" }}>
              {namaInstansi ? (
                <Text style={styles.valueForm}>{namaInstansi}</Text>
              ) : (
                <Text style={{ fontSize: 18 }}>Scan Barcode Pada Pos</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.label}>Status : </Text>
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
          <Text style={styles.label}>Catatan : </Text>
          <TextInput
            placeholder="Masukkan Catatan"
            style={styles.formCatatan}
            maxLength={200}
            multiline={true}
            onChangeText={(text) => setNotes(text)}
          />
          <Text style={styles.label}>Dokumentasi : (Max 4)</Text>
          <View
            style={[
              styles.formDokumentasi,
              { flexDirection: "row", marginTop: 10 },
            ]}
          >
            <Ionicons
              name="camera-outline"
              size={45}
              onPress={handleToCamera}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {images.map((image, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 90,
                    borderRadius: 10,
                  }}
                >
                  <Feather
                    name="x"
                    size={24}
                    color="#FFF"
                    style={{ position: "absolute", zIndex: 1, left: 50 }}
                    onPress={() => handleRemoveImage(index)}
                  />
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 10,
                      marginLeft: 5,
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
          <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
            <Text style={styles.buttonText}>Kirim Laporan Patroli</Text>
            <Ionicons name="chevron-forward-outline" color={"#FFF"} size={20} />
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
    fontWeight: "bold",
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
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  formDokumentasi: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#EEF5FF",
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
    borderRadius: 5,
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
    backgroundColor: "#088395",
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    width: "90%",
  },
  faceOverlay: {
    borderWidth: 2,
    borderColor: "transparent", // Menyembunyikan warna border secara umum
    position: "absolute",
    width: "70%",
    height: "20%",
    zIndex: 1,
    top: "9%",
    left: "15%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  border: {
    position: "absolute",
    width: 20,
    height: 20,
    borderWidth: 4,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopColor: "#FFF",
    borderLeftColor: "#FFF",
    borderRightColor: "transparent", // Tidak menampilkan warna di sisi right
    borderBottomColor: "transparent", // Tidak menampilkan warna di sisi bottom
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopColor: "#FFF",
    borderRightColor: "#FFF",
    borderLeftColor: "transparent", // Tidak menampilkan warna di sisi left
    borderBottomColor: "transparent", // Tidak menampilkan warna di sisi bottom
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomColor: "#FFF",
    borderLeftColor: "#FFF",
    borderTopColor: "transparent", // Tidak menampilkan warna di sisi top
    borderRightColor: "transparent", // Tidak menampilkan warna di sisi right
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomColor: "#FFF",
    borderRightColor: "#FFF",
    borderTopColor: "transparent", // Tidak menampilkan warna di sisi top
    borderLeftColor: "transparent", // Tidak menampilkan warna di sisi left
  },
});
