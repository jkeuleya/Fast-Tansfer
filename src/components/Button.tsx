import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { adjustSize, colors } from "../styles/Theme";

const Button = ({
  title,
  customStyles,
  ...props
}: {
  title: string;
  customStyles?: {
    gradianView?: ViewStyle;
    View?: ViewStyle;
    text?: TextStyle;
  };
} & TouchableOpacity["props"]) => {
  const width = Dimensions.get("screen").width;
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      <LinearGradient
        colors={colors.Primarygradient}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0.43 }}
        style={{
          height: adjustSize(48),
          width: width - adjustSize(25),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          ...customStyles?.gradianView,
        }}
      >
        <View
          style={{
            width: width - adjustSize(25),
            alignItems: "center",
            justifyContent: "center",
            height: adjustSize(48),
            ...customStyles?.View,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: adjustSize(13),
              ...customStyles?.text,
            }}
          >
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
