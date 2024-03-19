import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screen/Home";
import Riwayat from "./screen/Riwayat";
import Profil from "./screen/Profil";
import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BarStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
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
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("./assets/LOGO.png")}
                style={{ width: 200, height: 30 }}
              />
              <Image
                source={require("./assets/Universitas_Nasional_Logo.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
          // headerShown: false,
          tabBarInactiveTintColor: "#607274",
          tabBarActiveTintColor: "#088395",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={30} color={"#088395"} />
            ) : (
              <Ionicons name="home-outline" size={28} color="grey" />
            ),
        }}
      />

      <Tab.Screen
        name="Laporan & Riwayat"
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
              <Ionicons name="reader-outline" size={30} color="#088395" />
            ) : (
              <Ionicons name="reader-outline" size={28} color="#B0A695" />
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
              <Ionicons name="person" size={30} color="#088395" />
            ) : (
              <Ionicons name="person-outline" size={28} color="#B0A695" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BarStack;
