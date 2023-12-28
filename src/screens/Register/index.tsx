import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import CustomView from "../../components/CustomView";
import Input from "../../components/Input";
import { usecontext } from "../../hooks/Context";
import { adjustSize, baseStyles } from "../../styles/Theme";
import { NavigationProps, RegisterResponse } from "../../types/types";
import { register } from "../../libs/api.Routes";
import { addRegisterToken } from "../../hooks/AsyncStorage";
import Toast from "react-native-toast-message";

const Register = () => {
  const navigation: NavigationProps = useNavigation();
  const { setUser } = usecontext();
  const mailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);
  const comfirmPasswordRef = React.useRef<TextInput>(null);
  const [focus, setFocus] = React.useState<{
    mail: boolean;
    password: boolean;
    comfirmPassword: boolean;
  }>({
    mail: false,
    password: false,
    comfirmPassword: false,
  });
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [comfirmPassword, setComfirmPassword] = React.useState<string>("");

  const ButtonClick = () => {
    navigation.goBack();
  };

  const RegisterButton = async () => {
    if (email === "") {
      //@ts-ignore
      mailRef.current.focus();
      Toast.show({
        type: "error",
        text2: "Please enter your email",
      });
      return;
    }
    if (password === "") {
      //@ts-ignore
      passwordRef.current.focus();
      Toast.show({
        type: "error",
        text2: "Please enter your password",
      });
      return;
    }
    if (comfirmPassword === "") {
      Toast.show({
        type: "error",
        text2: "Please enter your comfirm password",
      });
      return;
    }
    if (password !== comfirmPassword) {
      Toast.show({
        type: "error",
        text2: "Please enter your password correctly",
      });
      return;
    }

    const { token, message }: RegisterResponse = await register({
      email,
      password,
    });

    if (message === "Request failed with status code 500") {
      Toast.show({
        type: "error",
        text2: "please try again later",
      });
      return;
    }
    if (message === "Network Error") {
      Toast.show({
        type: "error",
        text2: "Please check your internet connection",
      });
      return;
    }
    if (message === "Request failed with status code 422") {
      Toast.show({
        type: "error",
        text2: "User already exists",
      });
      return;
    }
    if (token !== "") {
      Toast.show({
        type: "success",
        text2: "Register successful!",
      });
    }

    await addRegisterToken(token);

    setUser({
      token: token,
      status: "created",
    });
  };
  return (
    <CustomView
      customStyles={{
        view: {
          paddingHorizontal: 10,
        },
      }}
      shouldScrollWithKeyboardAvoidingView
      autoFocusInputWithoutButtonWithScroll
      Button={
        <>
          <Button
            title="Register"
            onPress={() => {
              RegisterButton();
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: adjustSize(20),
            }}
          >
            <Text
              style={{
                fontSize: adjustSize(13),
                fontWeight: "400",

                color: "#E0E0E0",
              }}
            >
              Already have a account?
            </Text>
            <TouchableOpacity onPress={ButtonClick}>
              <Text
                style={{
                  fontSize: adjustSize(12),
                  fontWeight: "600",
                  marginLeft: adjustSize(5),
                  color: "#fff",
                }}
              >
                Sign
              </Text>
            </TouchableOpacity>
          </View>
        </>
      }
    >
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Text
        style={[
          baseStyles.CustomText,
          {
            marginTop: adjustSize(10),
            marginBottom: adjustSize(20),
          },
        ]}
      >
        Register your Account
      </Text>
      <Input
        ref={mailRef}
        focus={focus.mail}
        value={email}
        returnKeyType="next"
        onChangeText={(text) => {
          setEmail(text);
        }}
        onSubmitEditing={() => {
          passwordRef.current?.focus();
        }}
        onFocus={() => {
          setFocus({
            mail: true,
            password: false,
            comfirmPassword: false,
          });
        }}
        onBlur={() => {
          setFocus({
            mail: false,
            password: false,
            comfirmPassword: false,
          });
        }}
        icon={<WithLocalSvg asset={require("../../../assets/Svg/mail.svg")} />}
        placeholder="Enter your email"
        customStyles={{
          gradient: {
            marginBottom: adjustSize(20),
          },
        }}
      />
      <Input
        ref={passwordRef}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        focus={focus.password}
        returnKeyType="next"
        onSubmitEditing={() => {
          comfirmPasswordRef.current?.focus();
        }}
        onFocus={() => {
          setFocus({
            mail: false,
            password: true,
            comfirmPassword: false,
          });
        }}
        onBlur={() => {
          setFocus({
            mail: false,
            password: false,
            comfirmPassword: false,
          });
        }}
        icon={
          <WithLocalSvg asset={require("../../../assets/Svg/password.svg")} />
        }
        placeholder="Enter your password"
        secureTextEntry
        keyboardType="default"
        customStyles={{
          gradient: {
            marginBottom: adjustSize(20),
          },
        }}
      />
      <Input
        ref={comfirmPasswordRef}
        focus={focus.comfirmPassword}
        value={comfirmPassword}
        onChangeText={(text) => {
          setComfirmPassword(text);
        }}
        returnKeyType="done"
        onSubmitEditing={() => {
          RegisterButton();
        }}
        onFocus={() => {
          setFocus({
            mail: false,
            password: false,
            comfirmPassword: true,
          });
        }}
        onBlur={() => {
          setFocus({
            mail: false,
            password: false,
            comfirmPassword: false,
          });
        }}
        icon={
          <WithLocalSvg asset={require("../../../assets/Svg/password.svg")} />
        }
        placeholder="Confirm Password"
        secureTextEntry
        keyboardType="default"
      />
    </CustomView>
  );
};

export default Register;
