import React, { useRef } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker, Callout, Polygon } from "react-native-maps";

function PosJaga() {
  const mapRef = useRef();
  // const regionCoordinates = [
  //   { latitude: -6.2819591647304325, longitude: 106.8397758308623 },
  //   { latitude: -6.281840554254593, longitude: 106.8387687801136 },
  //   { latitude: -6.280365825800194, longitude: 106.83892612556114 },
  //   { latitude: -6.279580888698144, longitude: 106.83934060832388 },
  //   { latitude: -6.279683715427403, longitude: 106.83952227208735 },
  //   { latitude: -6.279588782939833, longitude: 106.83959787879728 },
  //   { latitude: -6.279678819740212, longitude: 106.83990833027214 },
  //   { latitude: -6.27999033392509, longitude: 106.84001822855781 },
  //   { latitude: -6.281918061495241, longitude: 106.8397765420201 },
  // ];
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: -6.280837731894491,
            longitude: 106.8394826451089,
            latitudeDelta: 0.001, // This sets the zoom level
            longitudeDelta: 0.001, // This sets the zoom level
          }}
        >
          <Marker
            coordinate={{
              latitude: -6.280837731894491,
              longitude: 106.8394826451089,
            }}
            // image={require("../assets/home.png")}
          ></Marker>
        </MapView>
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContent: {
    flex: 1,
  },
});

export default PosJaga;
