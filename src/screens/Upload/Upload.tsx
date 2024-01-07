import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { WithLocalSvg } from "react-native-svg";
import Button from "../../components/Button";
import CustomView from "../../components/CustomView";
import Headerbar from "../../components/Headerbar";
import Input from "../../components/Input";
import { uploadAndGetFile } from "../../libs/api.Routes";
import { adjustSize, colors } from "../../styles/Theme";
import { NavigationProps, ResponseFileUrl } from "../../types/types";
import * as WebBrowser from "expo-web-browser";
const Upload = () => {
  const [ismodalOpen, setismodalOpen] = React.useState<boolean>(false);

  const [value, onChangeText] = React.useState("");

  const [copiedText, setCopiedText] = React.useState<string>("");
  const navavigation: NavigationProps = useNavigation();

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
      // supports only files of type '*/*'
      type: "*/*",
      copyToCacheDirectory: false,
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
    //@ts-ignore
    const response: ResponseFileUrl = await uploadAndGetFile(
      "POST",
      //@ts-ignore
      file,
      value
    );

    if (response.status !== 201) {
      return;
    }

    if (response.status === 201) {
      setCopiedText(response.data.url);
    }
    console.log(
      "data",
      response.data,
      "status",
      response.status,
      "statusText",
      response.statusText
    );

    setFile({
      name: "",
      type: "",
      uri: "",
      lastModified: {
        date: "",
        time: "",
      },
    });
    onChangeText("");
    setismodalOpen(true);
  };

  return (
    <CustomView
      shouldScrollWithKeyboardAvoidingView
      Button={
        <Button
          onPress={ButtonClick}
          customStyles={{
            gradianView: {
              alignSelf: "center",
              marginBottom: adjustSize(10),
            },
          }}
          title="Generate & Copy Link"
        />
      }
    >
      <Headerbar>
        <Text
          style={{
            fontSize: adjustSize(20),
            fontWeight: "600",
            color: colors.white,
            paddingHorizontal: adjustSize(13),
          }}
        >
          Upload
        </Text>
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
          placeholder="Set Price"
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
              onPress={async () => {
                await Clipboard.setString(copiedText);
                // await WebBrowser.openBrowserAsync(copiedText);
                setismodalOpen(false);
                navavigation.navigate("Sales");
              }}
            />
          </View>
        </Modal>
      </View>
    </CustomView>
  );
};

export default Upload;
