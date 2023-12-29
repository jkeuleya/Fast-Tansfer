import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import CustomView from "../../components/CustomView";
import Headerbar from "../../components/Headerbar";
import BackButton from "../../components/BackButton";
import { NavigationProps } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { adjustSize, colors } from "../../styles/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { WithLocalSvg } from "react-native-svg";
import Input from "../../components/Input";
import * as DocumentPicker from "expo-document-picker";
import Button from "../../components/Button";
import { usecontext } from "../../hooks/Context";
import Modal from "react-native-modal";
import { uploadAndGetFile } from "../../libs/api.Routes";
const Upload = () => {
  const [ismodalOpen, setismodalOpen] = React.useState<boolean>(false);

  const [value, onChangeText] = React.useState("");

  const [coped, setcoped] = React.useState<boolean>(false);
  const navavigation: NavigationProps = useNavigation();

  const [data, setData] = React.useState<{
    file: any;
  }>({
    file: null as unknown as File,
  });
  const [file, setFile] = React.useState<{
    name?: string;
    type?: string;
    uri?: string;
    lastModified?: {
      date: string;
      time: string;
    };
  }>({
    name: "",
    type: "",
    uri: "",
    lastModified: {
      date: "",
      time: "",
    },
  });

  const width = Dimensions.get("screen").width;

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    setData({
      file: result.assets,
    });

    setFile({
      //@ts-ignore
      name: result?.assets[0].name.split(".")[0],
      //@ts-ignore
      type: result?.assets[0].mimeType,
      //@ts-ignore
      uri: result?.assets[0].uri,
      //@ts-ignore
      lastModified: {
        date:
          new Date().getFullYear().toString() +
          "/" +
          new Date().getMonth().toString() +
          "/" +
          new Date().getDate().toString(),
        time: new Date().getHours().toString() + ":" + new Date().getMinutes(),
      },
    });
  };
  const ButtonClick = async () => {
    if (value === "") {
      return;
    }
    if (file.name === "") {
      return;
    }

    // const response = await uploadAndGetFile("POST", file.uri, value);
    // console.log(response, "response");
  };
  // useMemo(() => {
  //   if (ismodalOpen === false && coped === true) {
  //     (async () => {

  //     })();
  //     setcoped(false);
  //   }
  // }, [ismodalOpen, coped]);

  return (
    <CustomView
      shouldScrollWithKeyboardAvoidingView
      Button={
        <Button
          onPress={ButtonClick}
          customStyles={{
            gradianView: {
              width: width - adjustSize(30),
              alignSelf: "center",
              marginBottom: adjustSize(10),
            },
          }}
          title="Generate & Copy Link"
        />
      }
    >
      <Headerbar>
        <BackButton
          onPress={() => {
            navavigation.goBack();
          }}
          title="Upload File"
          customStyles={{
            text: {
              fontSize: adjustSize(20),
            },
          }}
        />
      </Headerbar>

      <View
        style={{
          flex: 1,
          paddingHorizontal: adjustSize(10),
          marginTop: adjustSize(20),
        }}
      >
        {file.name === "" ? (
          <LinearGradient
            colors={colors.Primarygradient}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0.43 }}
            //

            style={{
              height: adjustSize(158),
              width: width - adjustSize(30),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              alignSelf: "center",
              marginBottom: adjustSize(20),
            }}
          >
            <TouchableOpacity
              onPress={pickDocument}
              style={{
                height: adjustSize(156),
                width: width - adjustSize(32),
                borderRadius: 10,
                backgroundColor: colors.black,
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={0.9}
            >
              <WithLocalSvg
                asset={require("../../../assets/Svg/Vector.svg")}
                width={adjustSize(50)}
                height={adjustSize(50)}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: adjustSize(20),
                  fontWeight: "bold",
                  marginTop: adjustSize(10),
                }}
              >
                Upload File
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <View
            style={{
              height: adjustSize(100),
              width: "100%",
              backgroundColor: colors.secondary,
              borderRadius: 20,
              marginBottom: adjustSize(10),
              paddingHorizontal: adjustSize(15),
              paddingVertical: adjustSize(10),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: adjustSize(13),
                alignItems: "center",
              }}
            >
              <WithLocalSvg
                asset={require("../../../assets/Svg/salesImage.svg")}
                height={adjustSize(55)}
                width={adjustSize(55)}
              />
              <View
                style={{
                  marginLeft: adjustSize(10),
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: adjustSize(16),
                    fontWeight: "bold",

                    color: "#fff",
                  }}
                >
                  {
                    //@ts-ignore
                    file?.name.split(".")[0]
                  }
                </Text>

                <Text
                  style={{
                    fontSize: adjustSize(12),
                    fontWeight: "500",
                    marginTop: adjustSize(5),
                    color: colors.secondaryLight,
                  }}
                >
                  {
                    //@ts-ignore
                    file?.lastModified.date.split("/").reverse().join("-") +
                      " " +
                      " "
                  }

                  {
                    //@ts-ignore
                    file?.lastModified.time
                  }
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setFile({
                    name: "",
                    type: "",
                    uri: "",
                    lastModified: {
                      date: "",
                      time: "",
                    },
                  });
                }}
              >
                <WithLocalSvg
                  asset={require("../../../assets/Svg/trash.svg")}
                  height={adjustSize(20)}
                  width={adjustSize(20)}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Input
          placeholder="set price"
          value={value}
          onChangeText={(text) => onChangeText(text)}
          keyboardType="numeric"
          icon={<WithLocalSvg asset={require("../../../assets/Svg/usd.svg")} />}
        />

        <Modal
          isVisible={ismodalOpen}
          swipeDirection="down"
          style={{
            margin: 0,
            backgroundColor: "rgba(0,0,0,0.01)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: adjustSize(264),
              height: adjustSize(380),
              // height: "auto",
              backgroundColor: colors.secondary,
              borderRadius: adjustSize(50),
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: adjustSize(20),
              padding: adjustSize(20),
            }}
          >
            <WithLocalSvg
              asset={require("../../../assets/Svg/modal_upload.svg")}
            />
            <Text
              style={{
                fontSize: adjustSize(18),
                fontWeight: "600",
                color: "#fff",
                marginTop: adjustSize(20),
              }}
            >
              Congratulations!
            </Text>

            <Text
              style={{
                fontSize: adjustSize(12),
                fontWeight: "600",
                color: colors.secondaryLight,
                marginTop: adjustSize(20),
                textAlign: "center",
              }}
            >
              Your file has been uploaded and ready to share.
            </Text>

            <Button
              title="Copy Link"
              customStyles={{
                gradianView: {
                  marginTop: adjustSize(20),
                  width: adjustSize(210),
                  height: adjustSize(50),
                },
              }}
              onPress={() => {
                // stripe();
                setismodalOpen(false);
                setcoped(true);
              }}
            />
          </View>
        </Modal>
      </View>
    </CustomView>
  );
};

export default Upload;
