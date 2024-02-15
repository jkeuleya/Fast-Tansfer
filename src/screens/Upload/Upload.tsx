import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
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
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
const Upload = () => {
  const [ismodalOpen, setismodalOpen] = React.useState<boolean>(false);

  const [value, onChangeText] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [copiedText, setCopiedText] = React.useState<string>("");
  const navavigation: NavigationProps = useNavigation();
  const [isloading, setisloading] = React.useState<boolean>(false);
  const [receivedAmount, setReceivedAmount] = React.useState<number>(0);
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

  React.useEffect(() => {
    // Fonction de calcul du montant reçu après les frais Stripe
    const calculateReceivedAmount = () => {
      const price = parseFloat(value);
      if (!isNaN(price)) {
        const feePercentage = 3.25;
        const feeFixed = 0.25;
        const receivedAmount = price - (price * (feePercentage / 100) + feeFixed);
        setReceivedAmount(receivedAmount);
      } else {
        setReceivedAmount(0);
      }
    };

    calculateReceivedAmount();
  }, [value]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
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
    if (file.name === "") {
      return Toast.show({
        type: "error",
        text2: "Please select a file",
        position: "top",
      });
    }
    // check if value starts with 0
    if (title === "") {
      return Toast.show({
        type: "error",
        text2: "Please enter a title",
        position: "top",
      });
    }

    if (value[0] === "0") {
      return Toast.show({
        type: "error",
        text2: "Minimum price is 1 EUR",
        position: "top",
      });
    }
    if (value === "") {
      return Toast.show({
        type: "error",
        text2: "Please enter a price",
        position: "top",
      });
    }

    setisloading(true);

    //@ts-ignore
    const response: ResponseFileUrl = await uploadAndGetFile(
      "POST",
      //@ts-ignore
      file,
      value,
      title
    );
    console.log("response", response);

    if (response.status !== 201) {
      setisloading(false);

      return Toast.show({
        type: "error",
        text2: "File size must be <= 200MB and image/mp3/mp4/pdf",
        position: "top",
      });

    }

    if (response.status === 201) {
      setCopiedText(response.data.url);
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
      setTitle("");
      setismodalOpen(true);
      setisloading(false);
    }
  };

  return (
    <CustomView
      shouldScrollWithKeyboardAvoidingView
      Button={
        <Button
          onPress={ButtonClick}
          Loading={isloading}
          disabled={isloading}
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
              activeOpacity={3}
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
              marginBottom: adjustSize(20),
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

        <View style={{ marginBottom: 25 }}>
          <Input
            placeholder="Set file's title" // Placeholder for the new input
            value={title} // Value for the new input
            onChangeText={(text) => setTitle(text)} // Update the state when the input changes
            keyboardType="default" // Use the default keyboard type for text input
            icon={<WithLocalSvg asset={require("../../../assets/Svg/pen.svg")} />} // Add an icon if needed
          />
        </View>

        <View>
          <Input
            placeholder="Set file's price"
            value={value}
            onChangeText={(text) => onChangeText(text)}
            keyboardType="numeric"
            icon={<WithLocalSvg asset={require("../../../assets/Svg/euro.svg")} />}
          />
        </View>

        <Text style={{ fontSize: adjustSize(16), color: '#9E9E9E', marginTop: adjustSize(20), textAlign: "center" }}>
          You'll receive: {receivedAmount.toFixed(2)} EUR.
        </Text>

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
              height: adjustSize(430),
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: adjustSize(20),
                backgroundColor: "rgba(0,0,0,0.2)",
                padding: adjustSize(10),
                borderRadius: adjustSize(10),
              }}
            >
              <WithLocalSvg
                asset={require("../../../assets/Svg/copyLink.svg")}
                height={adjustSize(15)}
                width={adjustSize(15)}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: adjustSize(12),
                  fontWeight: "500",
                  color: colors.secondaryLight,

                  marginLeft: adjustSize(5),
                }}
              >
                {copiedText}
              </Text>
            </View>

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
