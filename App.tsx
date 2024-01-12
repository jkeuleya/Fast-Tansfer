import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useMemo } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./StackNavigator";
import { ContextProvider } from "./src/hooks/Context";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);
// Ignore all log notifications:
LogBox.ignoreAllLogs();
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Plus_JakartaSans: require("./assets/Font/PlusJakartaSans-VariableFont_wght.ttf"),
  });

  useMemo(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const toastConfig = {
    //@ts-ignore
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#005B41",
          backgroundColor: "white",
          width: "90%",
          // alignSelf: "center",
        }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1Style={{
          fontSize: 17,
          fontWeight: "400",
        }}
      />
    ),

    //@ts-ignore
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#750E21",
          backgroundColor: "white",
        }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1Style={{
          fontSize: 15,
        }}
        text2Style={{
          fontSize: 14,
          color: "black",
          fontWeight: "400",
        }}
      />
    ),

    //@ts-ignore
    tomatoToast: ({ text2, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          {text2}
        </Text>
      </View>
    ),
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ContextProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <StackNavigator />
            <Toast
              position="top"
              visibilityTime={2000}
              // @ts-ignore
              ref={(ref) => Toast.setRef(ref)}
              //@ts-ignore
              config={toastConfig}
            />
          </SafeAreaProvider>
        </NavigationContainer>
      </ContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
