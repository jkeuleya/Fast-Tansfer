import { Dimensions, Platform, StyleSheet, Text } from "react-native";
const baseScreenWidth = 350;

export const adjustSize = (size: number) => {
  // Get the device's screen width
  const screenWidth = Dimensions.get("screen").width;

  // Calculate the adjusted size
  const adjustedSize = (size * screenWidth) / baseScreenWidth;

  return adjustedSize;
};

export const defaultShadow = () => {
  return generateBoxShadowStyle(3, 3, "#5c3161", 15, 10, 10, "#5c3161");
};

export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string
) => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
      elevation,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

export const colors = {
  Primarygradient: ["#E21E80", "#1E30F3"],
  white: "#FFFFFF",
  black: "#000000",
  none: "transparent",
  secondary: "#1D1F24",
  secondaryLight: "#9E9E9E",
};

export const baseStyles = StyleSheet.create({
  CustomText: {
    color: "#fff",
    fontSize: adjustSize(35),
    fontWeight: "700",
  },
});
