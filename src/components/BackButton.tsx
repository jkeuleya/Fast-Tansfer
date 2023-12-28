import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { BackButtonProps } from "../types/types";
import { adjustSize } from "../styles/Theme";

const BackButton = ({
  title,
  customStyles,
  ...props
}: BackButtonProps & React.ComponentProps<typeof TouchableOpacity>) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        alignItems: "center",
        flexDirection: "row",
        marginTop: adjustSize(10),
        paddingHorizontal: adjustSize(10),
        ...customStyles?.view,
      }}
    >
      <WithLocalSvg asset={require("../../assets/Svg/BackArrow.svg")} />

      <Text
        style={{
          marginLeft: 16,
          color: "#fff",
          fontSize: 18,
          fontWeight: "600",
          ...customStyles?.text,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BackButton;
