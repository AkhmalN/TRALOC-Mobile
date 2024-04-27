import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/Login";
import BarStack from "./BarStack";
import Patroli from "./controllers/add-patroli";
import AbsenCamera from "./services/AbsenCamera";
import PatrolCamera from "./services/PatrolCamera";
import AbsenMasuk from "./controllers/add-AbsenMasuk";
import Barcode from "./services/Barcode";
import DetailAbsensi from "./screen/DetailAbsensi";
import ActivityCamera from "./services/ActivityCamera";
import DetailPatroli from "./screen/DetailPatroli";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RiwayatAbsensi from "./screen/RiwayatAbsensi";
import RiwayatPatroli from "./screen/RiwayatPatroli";
import DataPribadi from "./screen/DataPribadi";
import { FontAwesome5 } from "@expo/vector-icons";
import Atensi from "./controllers/add-Atensi";
import Aktivitas from "./controllers/add-Aktivitas";
import RiwayatAktivitas from "./screen/RiwayatAktivitas";
import DetailAktivitas from "./screen/DetailAktivitas";
import RiwayatAtensi from "./screen/RiwayatAtensi";
import DetailAtensi from "./screen/DetailAtensi";
const queryClient = new QueryClient();
const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <QueryClientProvider client={queryClient}>
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
            name="AbsenMasuk"
            component={AbsenMasuk}
            options={{
              headerTitle: "Absensi Masuk",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />

          <Stack.Screen
            name="Atensi"
            component={Atensi}
            options={{
              headerTitle: "Buat Atensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Patroli"
            component={Patroli}
            options={{
              headerTitle: "Buat Patroli",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
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
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailAbsensi"
            component={DetailAbsensi}
            options={{
              headerTitle: "Detail Absensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailPatroli"
            component={DetailPatroli}
            options={{
              headerTitle: "Detail Patroli",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailAktivitas"
            component={DetailAktivitas}
            options={{
              headerTitle: "Detail Aktivitas",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Detail Atensi"
            component={DetailAtensi}
            options={{
              headerTitle: "Detail Atensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="AbsenCamera"
            component={AbsenCamera}
            options={{
              headerTitle: "Capture Absensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />

          <Stack.Screen
            name="Riwayat Absensi"
            component={RiwayatAbsensi}
            options={{
              headerTitle: "Riwayat Absensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Riwayat Patroli"
            component={RiwayatPatroli}
            options={{
              headerTitle: "Riwayat Patroli",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Riwayat Aktivitas"
            component={RiwayatAktivitas}
            options={{
              headerTitle: "Riwayat Aktivitas",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Riwayat Atensi"
            component={RiwayatAtensi}
            options={{
              headerTitle: "Riwayat Atensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Aktivitas"
            component={Aktivitas}
            options={{
              headerTitle: "Buat Aktivitas",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="ActivityCamera"
            component={ActivityCamera}
            options={{
              headerTitle: "Capture Activity",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Data Pribadi"
            component={DataPribadi}
            options={{
              headerTitle: "Profil",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#44B6C7", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
        </Stack.Navigator>
        <StatusBar
          hidden={false}
          translucent={false}
          // backgroundColor="#44B6C7"
        />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default MainNavigator;
