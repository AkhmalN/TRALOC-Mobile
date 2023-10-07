import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Riwayat from "../screen/Riwayat";
import Profil from "../screen/Profil";
import { Image } from "react-native";
import PosJaga from "../screen/PosJaga";
import TambahAktivitas from "../screen/TambahAktivitas";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 20,
          marginBottom: 10,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/homecolor.png")}
                resizeMode="cover"
                style={{
                  width: 33,
                  height: 33,
                  marginBottom: 15,
                }}
              />
            ) : (
              <Image
                source={require("../assets/home.png")}
                resizeMode="cover"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Daftar Pos"
        component={PosJaga}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/mapcolor.png")}
                resizeMode="cover"
                style={{
                  width: 33,
                  height: 33,
                  marginBottom: 15,
                }}
              />
            ) : (
              <Image
                source={require("../assets/map.png")}
                resizeMode="cover"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Aktivitas"
        component={TambahAktivitas}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/pluscolor.png")}
                resizeMode="cover"
                style={{
                  width: 35,
                  height: 35,
                  marginBottom: 20,
                }}
              />
            ) : (
              <Image
                source={require("../assets/plus.png")}
                resizeMode="cover"
                style={{
                  width: 35,
                  height: 35,
                  marginBottom: 20,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/historycolor.png")}
                resizeMode="cover"
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            ) : (
              <Image
                source={require("../assets/restore.png")}
                resizeMode="cover"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/usercolor.png")}
                resizeMode="cover"
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            ) : (
              <Image
                source={require("../assets/user.png")}
                resizeMode="cover"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
