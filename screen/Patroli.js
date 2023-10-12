import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Patroli() {
  const navigation = useNavigation();
  const [hasPersmission, setHasPermission] = useState(null);
  const [scanedData, setScannedData] = useState(false);
  // asumsi sudah mengscan barcode Lokasi
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPersmission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanner = ({ type, data }) => {
    setScannedData(data);
    console.log(`Data = ${data}`);
    console.log(`Type = ${type}`);
    navigation.navigate("FormPatrol", { scanedData: data });
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanedData ? undefined : handleBarCodeScanner}
      />
      {scanedData && (
        <Button title="Scan Again?" onPress={() => setScannedData(undefined)} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanner: {
    ...StyleSheet.absoluteFillObject, // This makes the scanner cover the whole screen
  },
});
