import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Riwayat from "../screen/Riwayat";
import Profil from "../screen/Profil";
import Aktivitas from "../screen/Aktivitas";
import { Image } from "react-native";

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
                source={require("../assets/home.png")}
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
        name="Aktivitas"
        component={Aktivitas}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/share.png")}
                resizeMode="cover"
                style={{
                  width: 33,
                  height: 33,
                  marginBottom: 15,
                }}
              />
            ) : (
              <Image
                source={require("../assets/share.png")}
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
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabelStyle: { fontSize: 12, width: "100%" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/restore.png")}
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
                source={require("../assets/user.png")}
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
