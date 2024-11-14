import { Text, View, FlatList, StyleSheet, Dimensions, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { darkGrey } from "@/constants/Colors";
import type { ReactElement } from "react";
import { useNavigation } from "@react-navigation/native";

type menu = { title: string; icon: ReactElement; href: string | undefined };
const data: menu[] = [
    { title: "Profile", href: "profile", icon: <Ionicons name="person" size={24} color="black" /> },
    { title: "Setting", href: "setting", icon: <FontAwesome name="gear" size={24} color="black" /> },
    { title: "Logout", href: undefined, icon: <AntDesign name="logout" size={22} color="black" /> },
];

const Item = ({ menu }: { menu: menu }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() => menu.href ? navigation.navigate(menu.href as never) : undefined}
        >
            <View style={style.item}>
                {menu.icon}
                <Text style={style.itemText}>{menu.title}</Text>
            </View>
        </Pressable>
    );
};

export default function Account() {
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
        height: 0.08 * screenHeight,
        justifyContent: "flex-start",
        borderTopColor: darkGrey,
        borderTopWidth: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    item: {
        minWidth: "25%",
        paddingLeft: 20,
        justifyContent:"space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    itemText: {
    },
});
