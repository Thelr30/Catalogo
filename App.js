import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Detail2 from "./screens/Detail2";
import Detail3 from "./screens/Detail3";
import Detail4 from "./screens/Detail4";
import Detail5 from "./screens/Detail5";
import Detail6 from "./screens/Detail6";
import Detail7 from "./screens/Detail7";
import Detail8 from "./screens/Detail8";
import Detail9 from "./screens/Detail9";

const Stack = createStackNavigator(); // ⬅ Definir aquí para evitar errores

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "LOGIN",
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#ff0000" },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "HOME",
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#ff0000" },
          }}
        />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Detail2" component={Detail2} />
        <Stack.Screen name="Detail3" component={Detail3} />
        <Stack.Screen name="Detail4" component={Detail4} />
        <Stack.Screen name="Detail5" component={Detail5} />
        <Stack.Screen name="Detail6" component={Detail6} />
        <Stack.Screen name="Detail7" component={Detail7} />
        <Stack.Screen name="Detail8" component={Detail8} />
        <Stack.Screen name="Detail9" component={Detail9} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
