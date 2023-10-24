import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Riwayat from "../screen/Riwayat";
import Profil from "../screen/Profil";
import { Image } from "react-native";
import PosJaga from "../screen/PosJaga";
// import TambahAktivitas from "../screen/TambahAktivitas";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: "#618264",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: { fontSize: 14, width: "100%", color: "#D0E7D2" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/icon/Home_fill_focused.png")}
                resizeMode="cover"
                style={{
                  width: 45,
                  height: 45,
                }}
              />
            ) : (
              <Image
                source={require("../assets/icon/Home.png")}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 5,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Daftar Pos"
        component={PosJaga}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%", color: "#D0E7D2" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/icon/Map_fill_focused.png")}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 5,
                }}
              />
            ) : (
              <Image
                source={require("../assets/icon/Map.png")}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            ),
        }}
      />
      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%", color: "#D0E7D2" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/icon/Tumer_fill_focused.png")}
                resizeMode="cover"
                style={{
                  width: 45,
                  height: 45,
                }}
              />
            ) : (
              <Image
                source={require("../assets/icon/Tumer.png")}
                resizeMode="cover"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%", color: "#D0E7D2" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/icon/Tumer_fill_focused.png")}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            ) : (
              <Image
                source={require("../assets/icon/User.png")}
                resizeMode="cover"
                style={{
                  width: 37,
                  height: 37,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
