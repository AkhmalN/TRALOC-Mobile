import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Riwayat from "../screen/Riwayat";
import Profil from "../screen/Profil";
import { View, Image } from "react-native";
import PosJaga from "../screen/PosJaga";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 50,
          padding: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          headerTitle: () => (
            <View style={{ width: 200 }}>
              <Image
                source={require("../assets/LOGO.png")}
                style={{ width: 200, height: 30 }}
              />
            </View>
          ),
          tabBarInactiveTintColor: "#607274",
          tabBarActiveTintColor: "#088395",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={28} color={"#088395"} />
            ) : (
              <Ionicons name="home-outline" size={26} color="grey" />
            ),
        }}
      />

      <Tab.Screen
        name="Daftar Pos"
        component={PosJaga}
        options={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: "#607274",
          tabBarActiveTintColor: "#088395",

          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="location" size={28} color="#088395" />
            ) : (
              <Ionicons name="location-outline" size={30} color="#B0A695" />
            ),
        }}
      />

      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: "#607274",
          tabBarActiveTintColor: "#088395",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="clipboard" size={26} color="#088395" />
            ) : (
              <Ionicons name="clipboard-outline" size={28} color="#B0A695" />
            ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: "#607274",
          tabBarActiveTintColor: "#088395",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={26} color="#088395" />
            ) : (
              <Ionicons name="person-outline" size={28} color="#B0A695" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
