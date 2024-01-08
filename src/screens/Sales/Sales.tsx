import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Modal from "react-native-modal";
import { WithLocalSvg } from "react-native-svg";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import CustomView from "../../components/CustomView";
import GradientText from "../../components/GradientText";
import Headerbar from "../../components/Headerbar";
import { removeTokens } from "../../hooks/AsyncStorage";
import { usecontext } from "../../hooks/Context";
import {
  getAgainStatus,
  getStripeurl,
  uploadAndGetFile,
} from "../../libs/api.Routes";
import { adjustSize, colors } from "../../styles/Theme";
import { SalesProps } from "../../types/types";
import Empty from "./components/EmptyItem";
import Items from "./components/Items";
import { WebView } from "react-native-webview";

const Sales = () => {
  const { setUser, user } = usecontext();
  const { showWebView, setShowWebView } = usecontext();
  const [data, setData] = React.useState<SalesProps>([]);

  const [modal, setModal] = React.useState(
    user?.status === "created" || user?.status === undefined ? true : false
  );
  const [StripeUrl, setStripeUrl] = React.useState<string>("");

  useMemo(() => {
    setModal(
      user?.status === "created" || user?.status === undefined ? true : false
    );
  }, [user?.status]);
  const stripe = async () => {
    setShowWebView(true);
  };

  const SECTIONS = [
    {
      title: "How it works?",
      content:
        "You will be redirected to our banking partner Stripe who will store your information in order to send you the funds from your sales. This step is mandatory because we do not store any of your information in our database.",
    },
  ];
  const [activeSections, setActiveSections] = React.useState<number[]>([]);

  const response = async () => {
    const response = await uploadAndGetFile("GET");
    if (response.status === 401 || response.statusText === "Unauthorized") {
      await removeTokens();
      setUser({
        status: undefined,
        token: undefined,
      });
    }

    if (response.status === 200) {
      //@ts-ignore
      setData(response.data);
    }
  };
  const getStripe = async () => {
    const response = await getStripeurl();
    if (response.status === 200) {
      setStripeUrl(response.url!);
    }
  };
  React.useEffect(() => {
    if (modal) {
      getStripe();
    } else {
      response();
    }
  }, [modal]);

  console.log(data);

  async function logout() {
    const response = await removeTokens();
    if (response === "Logged out ...") {
      setUser({
        status: undefined,
        token: undefined,
      });
    }
  }
  if (showWebView) {
    return (
      <WebView
        source={{ uri: StripeUrl }}
        style={{ marginTop: 20 }}
        onError={(error) => {
          console.log(error, "error");
        }}
        onHttpError={async (event) => {
          if (event.nativeEvent.statusCode === 422) {
            await setShowWebView(false);

            await getAgainStatus().then((response) => {
              if (response.status === 200) {
                Toast.show({
                  type: "success",
                  text2: "Account Activated",
                });
                setUser({
                  status: response.data?.confirmation_status
                    ? "activated"
                    : "created",
                  token: user?.token,
                });
              } else {
                Toast.show({
                  type: "error",
                  text2: "Something went wrong",
                });
              }
            });
          }
        }}
      />
    );
  }

  return (
    <CustomView customStyles={{}}>
      <Headerbar>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: adjustSize(20),
          }}
        >
          <GradientText
            text="Fast Transfer"
            customStyles={{
              text: {
                fontSize: adjustSize(22),
              },
            }}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              logout();
              Toast.show({
                type: "success",
                text2: "Logged out ...",
              });
            }}
          >
            <Text
              style={{
                fontSize: adjustSize(12),
                fontWeight: "600",
                color: "#fff",
                marginRight: adjustSize(8),
                marginBottom: adjustSize(2),
              }}
            >
              Log Out
            </Text>
            <WithLocalSvg asset={require("../../../assets/Svg/Logout.svg")} />
          </TouchableOpacity>
        </View>
      </Headerbar>
      <View
        style={{
          flex: 1,
          paddingHorizontal: adjustSize(10),
        }}
      >
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Empty />}
          renderItem={({ item, index }) => <Items item={item} key={index} />}
          style={{
            marginTop: adjustSize(10),
          }}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      </View>
      <Modal
        isVisible={modal}
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
            // height: adjustSize(380),
            height: "auto",
            backgroundColor: colors.secondary,
            borderRadius: adjustSize(50),
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: adjustSize(20),
            padding: adjustSize(20),
          }}
        >
          <WithLocalSvg asset={require("../../../assets/Svg/modal_Svg.svg")} />
          <Text
            style={{
              fontSize: adjustSize(18),
              fontWeight: "600",
              color: "#fff",
              marginTop: adjustSize(20),
            }}
          >
            Activation Pending
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
            Your account is pending activation. Please click the button below to
            activate your account.
          </Text>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={({ title }, index, isActive) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: adjustSize(15),
                  }}
                >
                  <Text
                    style={{
                      fontSize: adjustSize(14),
                      fontWeight: "600",
                      color: colors.white,
                    }}
                  >
                    {title}
                  </Text>
                  {!isActive ? (
                    <WithLocalSvg
                      asset={require("../../../assets/Svg/right_arrow.svg")}
                    />
                  ) : (
                    <WithLocalSvg
                      asset={require("../../../assets/Svg/chevron-down.svg")}
                      color={colors.white}
                    />
                  )}
                </View>
              );
            }}
            renderContent={({ content }) => {
              return (
                <View
                  style={{
                    paddingVertical: adjustSize(2),
                    paddingBottom: adjustSize(10),
                  }}
                >
                  <Text
                    style={{
                      fontSize: adjustSize(8),
                      fontWeight: "500",
                      color: colors.secondaryLight,
                    }}
                  >
                    {content}
                  </Text>
                </View>
              );
            }}
            onChange={(activeSections) => {
              setActiveSections(activeSections);
            }}
          />

          <Button
            title="Activate Now"
            customStyles={{
              gradianView: {
                marginTop: adjustSize(20),
                width: adjustSize(210),
                height: adjustSize(50),
              },
            }}
            onPress={() => {
              stripe();
            }}
          />
        </View>
      </Modal>
    </CustomView>
  );
};

export default Sales;
