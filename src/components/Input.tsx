import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef } from "react";
import { Dimensions, TextInput, View } from "react-native";
import { adjustSize, colors } from "../styles/Theme";
import { TextIconProps } from "../types/types";

const Input = forwardRef(
  (
    {
      icon,
      placeholder,
      customStyles,
      focus,
      ...props
    }: TextIconProps & TextInput["props"],
    ref: React.Ref<TextInput>
  ) => {
    const width = Dimensions.get("screen").width;
    return (
      <LinearGradient
        colors={
          focus ? colors.Primarygradient : ["#181A20", "#181A20", "#181A20"]
        }
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0.43 }}
        style={{
          height: adjustSize(50),
          width: width - adjustSize(24),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          alignSelf: "center",
          ...customStyles?.gradient,
        }}
      >
        <View
          style={{
            height: adjustSize(48),
            width: width - adjustSize(25),
            borderRadius: 10,
            backgroundColor: "#181A20",
            flexDirection: "row",
            alignItems: "center",
            ...customStyles?.InputContainer,
          }}
        >
          {icon && (
            <View
              style={{
                height: adjustSize(48),
                width: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </View>
          )}
          <TextInput
            ref={ref}
            {...props}
            style={{
              color: "#fff",
              height: adjustSize(48),
              borderRadius: 10,
              fontSize: adjustSize(12),
              fontWeight: "500",
              paddingLeft: icon ? 0 : adjustSize(10),
              flex: 1,
              ...customStyles?.textInput,
            }}
            placeholder={placeholder}
            placeholderTextColor={focus ? "#fff" : "rgba(255, 255, 255, 0.5)"}
          />
        </View>
      </LinearGradient>
    );
  }
);

export default Input;
