import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function FormAbsen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);

  const getRegionName = async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (location && location.length > 0) {
        const regionName = location[0].city;
        const street = location[0].street;
        const subRegion = location[0].subregion;
        return { regionName, street, subRegion };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (location) {
        const regionName = await getRegionName(
          location.coords.latitude,
          location.coords.longitude
        );
        setRegion(regionName);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <View style={styles.form}>
        {region && (
          <Text style={styles.textForm}>
            {region.street},{region.regionName},{region.regionName}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
