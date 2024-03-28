import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Notifikasi } from "../components/Notifikasi";
import { baseUrl } from "../api/apiConfig";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { useAuth } from "../context/userContext";
import { addAbsen } from "../api/absensi";

export default function FormAbsen({ route }) {
  const { id } = useAuth();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { savedPhoto } = route.params;
  const [username, setUsername] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState("");
  const [lokasiAbsen, setLokasiAbsen] = useState("");
  const [loading, setLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);

  const navigation = useNavigation();

  const hideNotifikasi = () => {
    setNotifikasiVisible(false);
  };

  const data_lokasi = [
    { title: "UNAS Pejanten" },
    { title: "UNAS Ragunan" },
    { title: "UNAS Bambu Kuning" },
  ];

  const handleLocationSelect = (selectedItem) => {
    setLokasiAbsen(selectedItem.title);
  };

  useEffect(() => {
    // Ambil username dari AsyncStorage saat komponen di-mount
    AsyncStorage.getItem("username")
      .then((value) => {
        if (value) {
          setUsername(value);
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    if (savedPhoto) {
      setImages([savedPhoto]); // Assuming savedPhoto.uri is the image URI
    }
  }, [savedPhoto]);

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      const response = await addAbsen({
        userId: id,
        username,
        latitude,
        longitude,
        lokasi_absen: lokasiAbsen,
        savedPhoto,
      });
      if (response.status === 201) {
        setLoading(false);
        setIsSuccess(true);
        setNotifikasiVisible(true);
        setTimeout(() => {
          setNotifikasiVisible(false);
          navigation.navigate("Home");
        }, 5000);
      }
      console.log(response.data);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {isSuccess && notifikasiVisible && (
          <Notifikasi
            message={"Berhasil mengirim absensi"}
            hideModal={hideNotifikasi}
          />
        )}
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.001, // This sets the zoom level
              longitudeDelta: 0.001, // This sets the zoom level
            }}
          >
            <Marker
              key={1}
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Lokasi Anda"
            ></Marker>
          </MapView>
        ) : (
          <Text>Loading location ...</Text>
        )}
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.formSection}>
          <View style={[styles.form, styles.flexRow]}>
            <Text style={styles.textForm}>Ambil Swafoto</Text>
            {images && (
              <AntDesign name="checkcircleo" size={28} color={"#088395"} />
            )}
          </View>
          {location ? (
            <View>
              <Text style={styles.label}>koordinat Anda Saat ini :</Text>
              <View style={styles.form}>
                <Text style={styles.textForm}>
                  {location.coords.latitude}(lat),{location.coords.longitude}
                  (lng)
                </Text>
              </View>
            </View>
          ) : (
            <Text>Loading data...</Text>
          )}
          <Text style={styles.label}>Lokasi Absen :</Text>
          <View style={styles.form}>
            <SelectDropdown
              data={data_lokasi}
              onSelect={handleLocationSelect}
              renderButton={(selectedItem) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) ||
                        "Pilih Lokasi Absen"}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}
                  >
                    <Text style={styles.textForm}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
          <Text style={styles.buttonText}>
            {loading ? "Mengirim Absen" : "Kirim Absen"}
          </Text>
          {loading ? (
            <ActivityIndicator
              size={"small"}
              style={{ marginLeft: 10, marginRight: 10 }}
              color={"#FFF"}
            />
          ) : (
            <Ionicons name="send" size={24} color={"#FFF"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  alertSuccess: {
    position: "absolute",
    backgroundColor: "#088395",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
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
  bottomContent: {
    width: "100%",
    marginTop: 20,
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  formSection: {
    width: "100%",
  },
  imageSection: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "#D0E7D2",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#088395",
    padding: 5,
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#088395",
    height: 50,
    width: "70%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 8,
    padding: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    marginHorizontal: 10,
  },

  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  textForm: {
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
