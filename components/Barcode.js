import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

export default function Barcode() {
  const navigation = useNavigation();
  const [hasPersmission, setHasPermission] = useState(null);
  const [scanedData, setScannedData] = useState(false);
  // asumsi mengscan barcode Lokasi

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

  // const lokasiDatabase = {
  //   "https://me-qr.com/iVT4O6jX": "Lokasi A",
  // };
  const handleBarCodeScanner = ({ type, data }) => {
    setScannedData(true);
    // console.log(`Data = ${data}`);
    console.log(`Type = ${type}`);
    const coordinatesMatch = data.match(/-?\d+\.\d+/g);
    if (coordinatesMatch && coordinatesMatch.length >= 2) {
      const latitude = parseFloat(coordinatesMatch[0]);
      const longitude = parseFloat(coordinatesMatch[1]);
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
      console.log("Koordinat geografis tidak ditemukan.");
    }

    // Ekstrak string kueri (query)
    const queryMatch = data.match(/\?q=(.*)/);
    if (queryMatch && queryMatch.length > 1) {
      const query = decodeURIComponent(queryMatch[1]);
      console.log(`Label: ${query}`);
    } else {
      console.log("String kueri tidak ditemukan.");
    }
    if (
      coordinatesMatch &&
      coordinatesMatch.length >= 2 &&
      queryMatch &&
      queryMatch > 1
    ) {
      // const latitude = parseFloat(coordinatesMatch[0]);
      // setScanedLatitude(latitude)
      // const longitude = parseFloat(coordinatesMatch[1]);
      // setScanedLatitude(longitude)
      // const label = decodeURIComponent(queryMatch[1]);
      // setScanedLabel(label)

      navigation.navigate("ScreenLain", {
        scanedData: coordinatesMatch,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleBarcode}>Buat Patroli</Text>
        <Text style={styles.childTitle}>Posisikan Barcode ditengah Kotak</Text>
      </View>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanedData ? undefined : handleBarCodeScanner}
          style={{ height: 500, width: 400 }}
        />
      </View>
      {scanedData && (
        <Button
          title={"Scan Ulang"}
          onPress={() => setScannedData(false)}
          color={"tomato"}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#79AC78",
  },
  titleBox: {
    width: "100%",
    padding: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  titleBarcode: {
    fontSize: 30,
    marginBottom: 20,
  },
  childTitle: {
    fontSize: 16,
  },
  barcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: 350,
    overflow: "hidden",
    borderRadius: 30,
  },
});
