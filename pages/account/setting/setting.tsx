import { Text, View, FlatList, StyleSheet, Dimensions, Pressable } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { darkGrey } from "@/constants/Colors";
import type { ReactElement } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";

type setting = { title: string; icon: ReactElement; href: string | undefined };

const Item = ({ setting }: { setting: setting }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() => (setting.href ? navigation.navigate(setting.href as never) : undefined)}
        >
            <View style={style.item}>
                <View>{setting.icon}</View>
                <Text style={style.itemText}>{setting.title}</Text>
            </View>
        </Pressable>
    );
};

export default function Setting() {
    const { lang } = useLanguage();
    const data: setting[] = [
        {
            title: lang("เลือกภาษา", "Select Language"),
            href: "language",
            icon: <MaterialIcons name="language" size={24} color="black" />,
        },
    ];
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList data={data} renderItem={({ item }) => <Item setting={item} />} />
        </View>
    );
}
const screenHeight = Dimensions.get("screen").height;
const style = StyleSheet.create({
    itemContainer: {
        height: 0.08 * screenHeight,
        justifyContent: "space-between",
        borderTopColor: darkGrey,
        borderTopWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 30,
        paddingRight: 30,
    },
    item: {
        flex: 1,
        columnGap: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    itemIcon: {
        flex: 1,
    },
    itemText: { flex: 10 },
});
