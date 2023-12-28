import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomViewProps } from "../types/types";

export default function CustomView({
  children,
  customStyles,
  shouldScrollWithKeyboardAvoidingView,
  autoFocusInputWithoutButtonWithScroll,
  Button,
}: CustomViewProps) {
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...customStyles?.view,
        height: height,
        width: width,
        backgroundColor: "#000",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {shouldScrollWithKeyboardAvoidingView ? (
        <>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
            }}
          >
            {autoFocusInputWithoutButtonWithScroll ? (
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                  flex: 1,
                }}
              >
                {children}
              </KeyboardAvoidingView>
            ) : (
              children
            )}
          </ScrollView>
          {Button}
        </>
      ) : (
        children
      )}
    </View>
  );
}
