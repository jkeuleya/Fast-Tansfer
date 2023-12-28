import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import CustomView from "../../components/CustomView";
import GradientText from "../../components/GradientText";
import Headerbar from "../../components/Headerbar";
import { adjustSize, colors } from "../../styles/Theme";
import Empty from "./components/EmptyItem";
import Items from "./components/Items";
import { usecontext } from "../../hooks/Context";
import Modal from "react-native-modal";
import Button from "../../components/Button";
import Accordion from "react-native-collapsible/Accordion";
import { uploadAndGetFile } from "../../libs/api.Routes";
import { SalesProps } from "../../types/types";
import { removeTokens } from "../../hooks/AsyncStorage";
import Toast from "react-native-toast-message";

const Sales = () => {
  const { setUser, user } = usecontext();

  const [data, setData] = React.useState<SalesProps>([]);

  const [modal, setModal] = React.useState(
    user?.status === "created" || user?.status === undefined ? true : false
  );

  useMemo(() => {
    setModal(
      user?.status === "created" || user?.status === undefined ? true : false
    );
  }, [user?.status]);

  const stripe = () => {
    setUser({
      status: "activated",
      token: user?.token,
    });
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
    setData(response as SalesProps);
  };

  React.useMemo(() => {
    response();
  }, [data.length < 2]);

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

  return (
    <CustomView>
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
            flex: 1,
            paddingBottom: adjustSize(30),
            marginBottom: adjustSize(60),
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
