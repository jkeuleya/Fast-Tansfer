import { View, Text } from "react-native";
import React from "react";
import { WithLocalSvg } from "react-native-svg";
import { adjustSize, colors } from "../../../../styles/Theme";

const Empty = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: adjustSize(500),
        alignSelf: "center",
        paddingHorizontal: adjustSize(20),
      }}
    >
      <WithLocalSvg
        asset={require("../../../../../assets/Svg/Logo-colour.svg")}
        height={adjustSize(80)}
        width={adjustSize(80)}
      />
      <Text
        style={{
          fontSize: adjustSize(23),
          fontWeight: "700",
          color: "#fff",
          marginVertical: adjustSize(10),
        }}
      >
        0 Sales
      </Text>
      <Text
        style={{
          fontSize: adjustSize(13),
          fontWeight: "500",
          color: colors.secondaryLight,
          textAlign: "center",
        }}
      >
        You don’t have any file uploaded. Upload a file to sell it.
      </Text>
    </View>
  );
};

export default Empty;
