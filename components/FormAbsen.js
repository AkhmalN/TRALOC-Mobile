import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FormAbsen({ coordinate, latitude, longitude, image }) {
  return (
    <View>
      <Text>Posisi Saat ini {coordinate}</Text>
      <Text>Pindai Barcode Absen</Text>
      <Text>Ambil Swafoto</Text>
      <Text>Kirim Absen Masuk</Text>
      <View>
        <TouchableOpacity>
          <Text>Kirim Absen Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
