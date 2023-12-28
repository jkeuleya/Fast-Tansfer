import React from "react";
import { View } from "react-native";
import { adjustSize, colors } from "../styles/Theme";

const Headerbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        width: "100%",
        height: adjustSize(60),
        backgroundColor: colors.secondary,
        borderBottomEndRadius: adjustSize(10),
        borderBottomStartRadius: adjustSize(10),
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};

export default Headerbar;
