import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Riwayat from "../screen/Riwayat";
import Profil from "../screen/Profil";
import { Image } from "react-native";
import PosJaga from "../screen/PosJaga";
import { Ionicons } from "react-native-vector-icons";
// import TambahAktivitas from "../screen/TambahAktivitas";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: ({ focused }) =>
            focused
              ? { fontSize: 16, width: "100%", color: "#0D1282" }
              : { fontSize: 14, width: "100%", color: "#352F44" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={32} color="#0D1282" />
            ) : (
              <Ionicons name="home-outline" size={30} color="#B0A695" />
            ),
        }}
      />

      <Tab.Screen
        name="Daftar Pos"
        component={PosJaga}
        options={{
          tabBarLabelStyle: ({ focused }) =>
            focused
              ? { fontSize: 16, width: "100%", color: "#0D1282" }
              : { fontSize: 14, width: "100%", color: "#352F44" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="location" size={32} color="#0D1282" />
            ) : (
              <Ionicons name="location-outline" size={30} color="#B0A695" />
            ),
        }}
      />

      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabelStyle: ({ focused }) =>
            focused
              ? { fontSize: 16, width: "100%", color: "#0D1282" }
              : { fontSize: 14, width: "100%", color: "#352F44" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="clipboard" size={32} color="#0D1282" />
            ) : (
              <Ionicons name="clipboard-outline" size={30} color="#B0A695" />
            ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabelStyle: ({ focused }) =>
            focused
              ? { fontSize: 16, width: "100%", color: "#0D1282" }
              : { fontSize: 14, width: "100%", color: "#352F44" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={32} color="#0D1282" />
            ) : (
              <Ionicons name="person-outline" size={30} color="#B0A695" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
