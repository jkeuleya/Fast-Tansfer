import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Platform } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { usecontext } from "./src/hooks/Context";
import Contact from "./src/screens/Contact/Contact";
import Login from "./src/screens/LoginScreen";
import Register from "./src/screens/Register";
import Sales from "./src/screens/Sales/Sales";
import Upload from "./src/screens/Upload/Upload";
import { adjustSize, colors } from "./src/styles/Theme";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { user, showWebView } = usecontext();

  function MyTabs() {
    const Ios = Platform.OS === "ios";
    return (
      <Tab.Navigator
        initialRouteName="Sales"
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: colors.secondary,
            borderTopWidth: 0,
            elevation: 20,
            height: Ios ? 74 : 67,
            paddingBottom: Ios ? 20 : 10,
            padding: adjustSize(4),
            borderTopEndRadius: adjustSize(15),
            borderTopStartRadius: adjustSize(15),
            display: showWebView ? "none" : "flex",
          },
        }}
      >
        <Tab.Screen
          name="Sales"
          component={Sales}
          options={{
            tabBarIcon: ({ color }) => {
              if (color === "#fff") {
                return (
                  <WithLocalSvg asset={require("./assets/Svg/Cart.svg")} />
                );
              } else {
                return (
                  <WithLocalSvg
                    asset={require("./assets/Svg/Cart_Light.svg")}
                  />
                );
              }
            },

            tabBarLabelStyle: {
              fontSize: adjustSize(12),
              fontWeight: "600",
            },
          }}
        />
        <Tab.Screen
          name="Upload"
          component={Upload}
          options={{
            title: "",
            tabBarIcon: () => {
              return (
                <WithLocalSvg asset={require("./assets/Svg/upload.svg")} />
              );
            },
            tabBarIconStyle: {
              marginTop: adjustSize(30),
            },
          }}
        />
        <Tab.Screen
          name="Support"
          component={Contact}
          options={{
            tabBarIcon: ({ color }) => {
              if (color === "#fff") {
                return (
                  <WithLocalSvg asset={require("./assets/Svg/Contact.svg")} />
                );
              } else {
                return (
                  <WithLocalSvg
                    asset={require("./assets/Svg/Contact_light.svg")}
                  />
                );
              }
            },

            tabBarLabelStyle: {
              fontSize: adjustSize(12),
              fontWeight: "600",
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  const authenticatedRoutes = [
    {
      name: "MyTabs",
      component: MyTabs,
    },
  ];
  const unauthenticatedRoutes = [
    {
      name: "Login",
      component: Login,
    },
    {
      name: "Register",
      component: Register,
    },
  ];

  const Routes =
    user?.token === null || user?.token === undefined
      ? unauthenticatedRoutes
      : authenticatedRoutes;

  useMemo(() => {
    return Routes;
  }, [user?.token]);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      {Routes.map((route) => {
        return (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default StackNavigator;
