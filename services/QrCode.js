import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function QrCode() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanResult({ type, data });
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScanResult(null);
  };

  const handleContinue = () => {
    navigation.navigate("Patroli", { scanResult: scanResult, from: "QrCode" });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && (
        <View style={styles.faceOverlay}>
          <View style={[styles.topLeft, styles.border]} />
          <View style={[styles.topRight, styles.border]} />
          <View style={[styles.bottomLeft, styles.border]} />
          <View style={[styles.bottomRight, styles.border]} />
        </View>
      )}

      {scanned && (
        <View style={styles.scanResultContainer}>
          <Text style={styles.scanResultText}>
            Scan QR Code didapat Lokasi pos {scanResult.data}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleScanAgain}
              style={{
                backgroundColor: "#FC676B",
                width: 130,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                marginHorizontal: 2,
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 18 }}>Scan Ulang</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleContinue}
              style={{
                backgroundColor: "#0081F1",
                width: 130,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                marginHorizontal: 2,
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 18 }}>Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanResultContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  scanResultText: {
    marginBottom: 10,
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  faceOverlay: {
    position: "relative",
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "transparent", // Menyembunyikan warna border secara umum
    position: "absolute",
    width: "70%",
    height: "40%",
    zIndex: 1,
    top: "20%",
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
