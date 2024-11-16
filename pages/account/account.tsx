import { Text, View, FlatList, StyleSheet, Dimensions, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { darkGrey } from "@/constants/Colors";
import { ReactElement, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";

type Menu = { title: string; icon: ReactElement; href: string | undefined };

const Item = ({ menu }: { menu: Menu }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() => (menu.href ? navigation.navigate(menu.href as never) : undefined)}
        >
            <View style={style.item}>
                <View style={style.itemIcon}>{menu.icon}</View>
                <Text style={style.itemText}>{menu.title}</Text>
            </View>
            <FontAwesome name="chevron-right" size={15} color="black" />
        </Pressable>
    );
};

export default function Account() {
    const { lang, currentLang } = useLanguage();
    const data = useMemo<Menu[]>(() => {
        return [
            { title: lang("โปรไฟล์", "Profile"), href: "profile", icon: <Ionicons name="person" size={24} color="black" /> },
            { title: lang("การตั้งค่า", "Setting"), href: "setting", icon: <FontAwesome name="gear" size={24} color="black" /> },
            {
                title: lang("ออกจากระบบ", "Logout"),
                href: undefined,
                icon: <Ionicons name="exit-outline" size={24} color="black" />,
            },
        ];
    }, [currentLang]);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList data={data} renderItem={({ item }) => <Item menu={item} />} />
        </View>
    );
}
const screenHeight = Dimensions.get("screen").height;
const style = StyleSheet.create({
    itemContainer: {
        height: 75,
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
