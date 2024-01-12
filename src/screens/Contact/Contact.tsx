import { View, Text } from "react-native";
import React, { useEffect } from "react";
import CustomView from "../../components/CustomView";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/types";
import BackButton from "../../components/BackButton";
import Headerbar from "../../components/Headerbar";
import { adjustSize, colors } from "../../styles/Theme";
import { WithLocalSvg } from "react-native-svg";
import Accordion from "react-native-collapsible/Accordion";
import { getFaQs } from "../../libs/api.Routes";

const Contact = () => {
  const navagation: NavigationProps = useNavigation();

  const [SECTIONS, setSECTIONS] = React.useState<
    {
      title: string;
      answer: string;
    }[]
  >([]);
  const [activeSections, setActiveSections] = React.useState<number[]>([]);
  useEffect(() => {
    async function prepare() {
      const response = await getFaQs();
      if (response.status === 200) {
        setSECTIONS(response.data || []);
      }
    }
    prepare();
  }, [SECTIONS.length <= 0]);
  return (
    <CustomView>
      <Headerbar>
        <Text
          style={{
            fontSize: adjustSize(20),
            fontWeight: "600",
            color: colors.white,
            paddingHorizontal: adjustSize(13),
          }}
        >
          Contact
        </Text>
      </Headerbar>
      <View
        style={{
          flex: 1,
          paddingHorizontal: adjustSize(20),
          marginTop: adjustSize(20),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: adjustSize(10),
          }}
        >
          <View
            style={{
              flex: 1,
              height: adjustSize(130),
              backgroundColor: colors.secondary,
              borderRadius: adjustSize(13),
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <WithLocalSvg
              asset={require("../../../assets/Svg/Message.svg")}
              height={adjustSize(25)}
              width={adjustSize(25)}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: adjustSize(15),
                  fontWeight: "500",
                  color: colors.secondaryLight,
                  marginBottom: adjustSize(5),
                }}
              >
                Email us at
              </Text>
              <Text
                style={{
                  fontSize: adjustSize(11),
                  fontWeight: "400",
                  color: colors.white,
                }}
              >
                zikkoran@apjat.tz
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,

              height: adjustSize(130),
              backgroundColor: colors.secondary,
              borderRadius: adjustSize(13),
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <WithLocalSvg
              asset={require("../../../assets/Svg/whatsapp.svg")}
              height={adjustSize(25)}
              width={adjustSize(25)}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: adjustSize(14),
                  fontWeight: "500",
                  color: colors.secondaryLight,
                  marginBottom: adjustSize(5),
                }}
              >
                WhatsApp Us
              </Text>
              <Text
                style={{
                  fontSize: adjustSize(11),
                  fontWeight: "400",
                  color: colors.white,
                }}
              >
                (272) 948-1209
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: adjustSize(20),
          }}
        >
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
                    borderBottomWidth:
                      index === SECTIONS.length - 1 ? 0 : isActive ? 0 : 0.5,
                    borderBottomColor: colors.secondaryLight,
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
            renderContent={({ answer }, index, isActive) => {
              return (
                <View
                  style={{
                    paddingVertical: adjustSize(2),
                    borderBottomWidth:
                      index === SECTIONS.length - 1 ? 0 : !isActive ? 0 : 0.5,
                    borderBottomColor: colors.secondaryLight,
                    paddingBottom: adjustSize(10),
                  }}
                >
                  <Text
                    style={{
                      fontSize: adjustSize(13),
                      fontWeight: "500",
                      color: colors.secondaryLight,
                    }}
                  >
                    {answer}
                  </Text>
                </View>
              );
            }}
            onChange={(activeSections) => {
              setActiveSections(activeSections);
            }}
          />
        </View>
      </View>
    </CustomView>
  );
};

export default Contact;
