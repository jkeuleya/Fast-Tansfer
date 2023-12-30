import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text } from "react-native";
import { adjustSize, colors } from "../styles/Theme";
import { GradientTextProps } from "../types/types";

const GradientText = ({
  customStyles,
  customColors,
  text,
}: GradientTextProps) => {
  return (
    <MaskedView
      style={{
        ...customStyles?.gradientContainer,
        height: adjustSize(50),
        marginTop: adjustSize(15),
      }}
      maskElement={
        <Text
          style={{
            fontSize: adjustSize(32),
            fontWeight: "bold",
            ...customStyles?.text,
          }}
        >
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={customColors || colors.Primarygradient}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0.43 }}
        style={{
          flex: 1,
          height: adjustSize(200),
          width: adjustSize(200),
          alignItems: "center",
          alignSelf: "center",
          ...customStyles?.gradient,
        }}
      />
    </MaskedView>
  );
};

export default GradientText;
