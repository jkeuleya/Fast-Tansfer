import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Button from "../../components/Button";
import CustomView from "../../components/CustomView";
import GradientText from "../../components/GradientText";
import Input from "../../components/Input";
import { usecontext } from "../../hooks/Context";
import { login } from "../../libs/api.Routes";
import { adjustSize, baseStyles } from "../../styles/Theme";
import { LoginResponse, NavigationProps } from "../../types/types";
import { addLoginData } from "../../hooks/AsyncStorage";
import Toast from "react-native-toast-message";

const Login = () => {
  const navigation: NavigationProps = useNavigation();
  const mailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);
  const [mail, setMail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { setUser } = usecontext();
  const [focus, setFocus] = React.useState<{
    mail: boolean;
    password: boolean;
  }>({
    mail: false,
    password: false,
  });
  const ButtonClick = () => {
    navigation.navigate("Register");
  };
  const Login = async () => {
    if (mail === "") {
      Toast.show({
        type: "error",
        text2: "Please enter your email",
      });
      return;
    }
    if (password === "") {
      Toast.show({
        type: "error",
        text2: "Please enter your password",
      });
      return;
    }

    const response: LoginResponse = await login({
      email: mail,
      password,
    });
    if (response.message === "Request failed with status code 401") {
      Toast.show({
        type: "error",
        text2: "Please enter your email and password correctly",
      });
      return;
    }
    if (response.message === "Request failed with status code 500") {
      Toast.show({
        type: "error",
        text2: "please try again later",
      });
      return;
    }
    if (response.message === "Network Error") {
      Toast.show({
        type: "error",
        text2: "Please check your internet connection",
      });
      return;
    }

    await addLoginData(response.status, response.token);

    if (response.status !== "") {
      Toast.show({
        type: "success",
        text2: "Login successful!",
      });
    }

    setUser({
      //@ts-ignore
      status: response.status,
      token: response.token,
    });
  };

  return (
    <CustomView
      customStyles={{
        view: {
          paddingHorizontal: adjustSize(10),
        },
      }}
      shouldScrollWithKeyboardAvoidingView
    >
      <View
        style={{
          height: `${adjustSize(30)}%`,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WithLocalSvg
          asset={require("../../../assets/Svg/Logo.svg")}
          style={{
            marginTop: adjustSize(10),
          }}
        />

        <GradientText
          text="Fast Transfer"
          customStyles={{
            gradientContainer: {
              marginTop: adjustSize(15),
            },
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={baseStyles.CustomText}>Log in to your account</Text>

        <View
          style={{
            marginVertical: adjustSize(20),
          }}
        >
          <Input
            ref={mailRef}
            focus={focus.mail}
            returnKeyType="next"
            keyboardType="email-address"
            value={mail}
            onChangeText={(e) => {
              setMail(e);
            }}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            onFocus={() => {
              setFocus({
                mail: true,
                password: false,
              });
            }}
            onBlur={() => {
              setFocus({
                mail: false,
                password: false,
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
            focus={focus.password}
            value={password}
            onChangeText={(e) => {
              setPassword(e);
            }}
            returnKeyType="done"
            onSubmitEditing={() => {
              Login();
            }}
            onFocus={() => {
              setFocus({
                mail: false,
                password: true,
              });
            }}
            onBlur={() => {
              setFocus({
                mail: false,
                password: false,
              });
            }}
            icon={
              <WithLocalSvg
                asset={require("../../../assets/Svg/password.svg")}
              />
            }
            placeholder="Enter your password"
            secureTextEntry
            keyboardType="default"
          />
        </View>
      </View>
      <Button
        title="Log in"
        onPress={() => {
          Login();
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
          Don’t have an account?
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
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </CustomView>
  );
};

export default Login;
