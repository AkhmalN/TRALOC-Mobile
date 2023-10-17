import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/Login";
import BottomTabBar from "./components/BottomTabBar";
import Patroli from "./screen/Patroli";
import FormPatrol from "./components/FormPatrol";
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
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="FormPatrol"
          component={FormPatrol}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
      <StatusBar hidden={false} translucent={false} backgroundColor="#F5F5F5" />
    </NavigationContainer>
  );
}
