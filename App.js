import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/Login";
import BottomTabBar from "./components/BottomTabBar";
import Patroli from "./screen/Patroli";
import DetailRiwayat from "./screen/DetailRiwayat";
import Absen from "./screen/Absen";
import AbsenCamera from "./components/AbsenCamera";
import PatrolCamera from "./components/PatrolCamera";
import FormAbsen from "./components/FormAbsen";
import Barcode from "./components/Barcode";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomTabBar"
          component={BottomTabBar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Patroli"
          component={Patroli}
          options={{
            headerTitle: "Buat Patroli",
            headerStyle: {
              backgroundColor: "#79AC78",
            },
          }}
        />
        <Stack.Screen
          name="Barcode"
          component={Barcode}
          options={{
            headerTitle: "Scan Barcode Pos",
            headerStyle: {
              backgroundColor: "#618264",
            },
          }}
        />
        <Stack.Screen name="PatrolCamera" component={PatrolCamera} />
        <Stack.Screen
          name="DetailRiwayat"
          component={DetailRiwayat}
          options={{
            headerTitle: "Detail Riwayat",
          }}
        />
        <Stack.Screen name="Camera" component={AbsenCamera} />
        <Stack.Screen
          name="Absen"
          component={Absen}
          options={{
            headerTitle: "Absensi",
          }}
        />
        <Stack.Screen
          name="FormAbsen"
          component={FormAbsen}
          options={{
            headerTitle: "Absensi",
          }}
        />
      </Stack.Navigator>
      <StatusBar hidden={false} translucent={false} backgroundColor="#F5F5F5" />
    </NavigationContainer>
  );
}
