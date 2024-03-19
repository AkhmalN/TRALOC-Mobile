import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Text, Button } from "react-native";

export const askForCameraPermission = async () => {
  const { status } = await BarCodeScanner.requestPermissionsAsync();
  return status === "granted";
};

export const renderPermissionMessage = (
  hasPermission,
  requestCameraPermission
) => {
  if (hasPermission === null) {
    return (
      <View>
        <Text>Mengambil izin akses kamera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>Anda tidak memberikan izin akses kamera.</Text>
        <Button title="Izinkan" onPress={requestCameraPermission} />
      </View>
    );
  }

  return null;
};
