import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Button from "../../../../components/Button";
import { adjustSize, colors } from "../../../../styles/Theme";
import * as Clipboard from "expo-clipboard";

const Items = ({
  item,
  onDeletePress,
}: {
  item: {
    created_at?: string;
    id?: number;
    price?: number;
    sold_count?: number;
    status?: "created" | "sold";
    stripe_price_id?: string;
    stripe_product_id?: string;
    updated_at?: string;
    user_id?: number;
  };
  onDeletePress?: TouchableOpacity["props"]["onPress"];
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
        {item.status === "sold" ? (
          <View
            style={{
              padding: adjustSize(5),
              paddingHorizontal: adjustSize(12),
              borderRadius: 7,
              backgroundColor: "#000",
            }}
          >
            <Text
              style={{
                fontSize: adjustSize(12),
                fontWeight: "500",
                color: "#fff",
              }}
            >
              {item.status}
            </Text>
          </View>
        ) : (
          <Button
            disabled={true}
            title={item.status as string}
            customStyles={{
              gradianView: {
                width: adjustSize(80),
                height: adjustSize(30),
                borderRadius: 7,
              },
              View: {
                width: adjustSize(80),
                height: adjustSize(30),
                borderRadius: 7,
              },
              text: {
                fontWeight: "500",
              },
            }}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onDeletePress}>
            <WithLocalSvg
              asset={require("../../../../../assets/Svg/trash.svg")}
              height={adjustSize(20)}
              width={adjustSize(20)}
              style={{
                marginRight: adjustSize(10),
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Clipboard.setString(item.title);
            }}
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
          <Text
            style={{
              fontSize: adjustSize(16),
              fontWeight: "bold",

              color: "#fff",
            }}
          >
            {item.stripe_product_id}
          </Text>
          <View
            style={{
              marginVertical: adjustSize(5),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <WithLocalSvg
              asset={require("../../../../../assets/Svg/usd.svg")}
            />
            <Text
              style={{
                fontSize: adjustSize(11),
                fontWeight: "500",
                marginLeft: adjustSize(2),
                color: "#fff",
              }}
            >
              {item.price}
            </Text>
          </View>
          <Text
            style={{
              fontSize: adjustSize(12),
              fontWeight: "500",
              color: colors.secondaryLight,
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
