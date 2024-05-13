import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screen/Home";
import Profil from "./screen/Profil";
import { View, Image } from "react-native";
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import Riwayat from "./screen/Riwayat";

const Tab = createBottomTabNavigator();

const BarStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 3,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: {
            fontSize: 16,
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
              <AntDesign name="home" size={35} color={"#088395"} />
            ) : (
              <AntDesign name="home" size={30} color="grey" />
            ),
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: "#607274",
          tabBarActiveTintColor: "#088395",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="manage-history" size={35} color="#088395" />
            ) : (
              <MaterialIcons name="manage-history" size={30} color="#B0A695" />
            ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: "#607274",
          tabBarActiveTintColor: "#088395",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="user-cog" size={32} color="#088395" />
            ) : (
              <FontAwesome5 name="user-cog" size={28} color="#B0A695" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BarStack;
