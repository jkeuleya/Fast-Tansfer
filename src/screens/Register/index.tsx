import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { openBrowserAsync } from "expo-web-browser";
import CheckBox from "react-native-check-box";
import { WithLocalSvg } from "react-native-svg";
import Toast from "react-native-toast-message";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import CustomView from "../../components/CustomView";
import GradientText from "../../components/GradientText";
import Input from "../../components/Input";
import { addLoginData } from "../../hooks/AsyncStorage";
import { usecontext } from "../../hooks/Context";
import { register } from "../../libs/api.Routes";
import { adjustSize, baseStyles } from "../../styles/Theme";
import { NavigationProps, RegisterResponse } from "../../types/types";

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
  const [isChecked, setChecked] = React.useState<boolean>(false);

  const ButtonClick = () => {
    navigation.goBack();
  };
  const TremsClick = () => {
    openBrowserAsync("https://fast-transfer.app/tos.pdf");
  };
  const PrivacyClick = () => {
    openBrowserAsync("https://fast-transfer.app/privacy.pdf");
  };

  const RegisterButton = async () => {
    if (!isChecked) {
      Toast.show({
        type: "error",
        text2: "Please agree to the terms of service and privacy policy",
      });
      return;
    }

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
        text2: "Passwords are not identical",
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
        text2: "Please try again later",
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

    await addLoginData("created", token);

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
    >
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View
        style={{
          flex: 1,
          flexGrow: 1,
          marginBottom: adjustSize(20),
        }}
      >
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
        <Text
          style={[
            baseStyles.CustomText,
            {
              fontSize: adjustSize(15),
              fontWeight: "400",
              marginBottom: adjustSize(20),
              color: "#9E9E9E",
            },
          ]}
        >
          By registering, you are acknowledging and agreeing to the Terms of
          Service and Privacy Policy.
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
          icon={
            <WithLocalSvg asset={require("../../../assets/Svg/mail.svg")} />
          }
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
        <View
          style={{
            paddingVertical: adjustSize(20),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            style={{ padding: 10 }}
            onClick={() => {
              setChecked(!isChecked);
            }}
            isChecked={isChecked}
            checkedCheckBoxColor={"#fff"}
            uncheckedCheckBoxColor={"#fff"}
          />

          <Text
            style={[
              {
                fontSize: adjustSize(14),
                fontWeight: "400",
                color: "#9E9E9E",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              },
            ]}
          >
            I agree the Fast Transfer{" "}
            <TouchableOpacity
              style={{
                height: adjustSize(20),
                justifyContent: "center",
              }}
              activeOpacity={4}
              onPress={() => {
                TremsClick();
              }}
            >
              <GradientText
                text="Terms of Services"
                customStyles={{
                  gradient: {
                    width: adjustSize(120),
                  },
                  gradientContainer: {
                    marginTop: adjustSize(10),
                    height: adjustSize(20),
                  },
                  text: {
                    fontSize: adjustSize(14),
                    fontWeight: "400",
                  },
                }}
              />
            </TouchableOpacity>
            and{" "}
            <TouchableOpacity
              style={{
                height: adjustSize(20),
                justifyContent: "center",
              }}
              activeOpacity={4}
              onPress={() => {
                PrivacyClick();
              }}
            >
              <GradientText
                text="Privacy Policy"
                customStyles={{
                  gradient: {
                    width: adjustSize(120),
                  },
                  gradientContainer: {
                    marginTop: adjustSize(10),
                    height: adjustSize(20),
                  },
                  text: {
                    fontSize: adjustSize(14),
                    fontWeight: "400",
                  },
                }}
              />
            </TouchableOpacity>
          </Text>
        </View>
      </View>
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
    </CustomView>
  );
};

export default Register;
