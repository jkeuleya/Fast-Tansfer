import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { adjustSize } from "../styles/Theme";
import { CustomViewProps } from "../types/types";

export default function CustomView({
  children,
  customStyles,
  shouldScrollWithKeyboardAvoidingView,
  autoFocusInputWithoutButtonWithScroll,
  Button,
}: CustomViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...customStyles?.view,
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#000",
        marginTop: adjustSize(insets.top),
        marginBottom: adjustSize(insets.bottom),
      }}
    >
      {shouldScrollWithKeyboardAvoidingView ? (
        <>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            style={{
              flex: 1,
            }}
            scrollEnabled={true}
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
