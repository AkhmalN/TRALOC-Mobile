import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/Login";
import BarStack from "./BarStack";
import Patroli from "./controllers/add-patroli";
import GetAbsensi from "./controllers/get-absensi";
import AbsenCamera from "./services/AbsenCamera";
import PatrolCamera from "./services/PatrolCamera";
import AbsenMasuk from "./controllers/add-AbsenMasuk";
import AbsenKeluar from "./controllers/add-AbsenKeluar";
import Barcode from "./services/Barcode";
import DetailAbsensi from "./screen/DetailAbsensi";
import Aktivitas from "./screen/Aktivitas";
import ActivityCamera from "./services/ActivityCamera";
import DetailPatroli from "./screen/DetailPatroli";
const Stack = createStackNavigator();

function App() {
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
          component={BarStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Patroli"
          component={Patroli}
          options={{
            headerTitle: "Buat Patroli",
          }}
        />
        <Stack.Screen
          name="Barcode"
          component={Barcode}
          options={{
            headerTitle: "Scan Barcode Pos",
          }}
        />
        <Stack.Screen
          name="PatrolCamera"
          component={PatrolCamera}
          options={{
            headerTitle: "Capture Dokumentasi",
          }}
        />
        <Stack.Screen
          name="DetailAbsensi"
          component={DetailAbsensi}
          options={{
            headerTitle: "Detail Absensi",
          }}
        />
        <Stack.Screen
          name="DetailPatroli"
          component={DetailPatroli}
          options={{
            headerTitle: "Detail Patroli",
          }}
        />
        <Stack.Screen
          name="AbsenCamera"
          component={AbsenCamera}
          options={{
            headerTitle: "Capture Absensi",
          }}
        />
        <Stack.Screen
          name="GetAbsensi"
          component={GetAbsensi}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AbsenMasuk"
          component={AbsenMasuk}
          options={{
            headerTitle: "Absensi Masuk",
          }}
        />
        <Stack.Screen
          name="AbsenKeluar"
          component={AbsenKeluar}
          options={{
            headerTitle: "Absensi Keluar",
          }}
        />
        <Stack.Screen
          name="Aktivitas"
          component={Aktivitas}
          options={{
            headerTitle: "Buat Aktivitas",
          }}
        />
        <Stack.Screen
          name="ActivityCamera"
          component={ActivityCamera}
          options={{
            headerTitle: "Capture Activity",
          }}
        />
      </Stack.Navigator>
      <StatusBar hidden={false} translucent={false} backgroundColor="#F5F5F5" />
    </NavigationContainer>
  );
}
export default App;
