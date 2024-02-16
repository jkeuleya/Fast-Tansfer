import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Button from "../../../../components/Button";
import { adjustSize, colors } from "../../../../styles/Theme";
import * as Clipboard from "expo-clipboard";

const Items = ({
  item,
}: {
  item: {
    created_at: string;
    id: number;
    name: string;
    price: number;
    sold_count: number;
    status: string;
    url: string;
    user_id: number;
  };
}) => {
  return (
    <View
      style={{
        flex: 1,
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
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: adjustSize(5),
        }}
      >
        <View>
          <Text
            style={{
              fontSize: adjustSize(16),
              fontWeight: "bold",

              color: "#fff",
            }}
          >
            {item.name}
          </Text>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(item.url);
            }}
            style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
          >
            <WithLocalSvg
              asset={require("../../../../../assets/Svg/copy.svg")}
              height={adjustSize(20)}
              width={adjustSize(20)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: adjustSize(13),
          alignItems: "flex-end",
        }}
      >
        <WithLocalSvg
          asset={require("../../../../../assets/Svg/salesImage.svg")}
          height={adjustSize(55)}
          width={adjustSize(55)}
        />
        <View
          style={{
            marginLeft: adjustSize(10),
            flex: 1,
          }}
        >
          <View
            style={{
              marginVertical: adjustSize(5),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <WithLocalSvg
              asset={require("../../../../../assets/Svg/euro_light.svg")}
            />
            <Text
              style={{
                fontSize: adjustSize(11),
                fontWeight: "500",
                marginLeft: adjustSize(5),
                color: "#fff",
              }}
            >
              {item.price + ' '}
            </Text>

            <WithLocalSvg
              asset={require("../../../../../assets/Svg/cart.svg")}
              height={adjustSize(15)}
              width={adjustSize(15)}
              style={{
                marginLeft: adjustSize(5),
              }}
              color={colors.white}
            />
            <Text
              style={{
                fontSize: adjustSize(11),
                fontWeight: "500",
                marginLeft: adjustSize(5),
                color: "#fff",
              }}
            >
              {item.sold_count}
            </Text>
          </View>
          <Text
            style={{
              fontSize: adjustSize(12),
              fontWeight: "500",
              color: colors.secondaryLight,
              marginBottom: adjustSize(5),
            }}
          >
            {
              //@ts-ignore
              item.created_at.split("T")[0]
            }{" "}
            {
              //@ts-ignore
              item.created_at.split("T")[1].split(".")[0]
            }
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Items;
