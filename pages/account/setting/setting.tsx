import { View, FlatList, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { darkGrey } from "@/constants/Colors";
import { type ReactElement } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import CustomText from "@/components/CustomText";

type SettingItem = { title: string; icon: ReactElement; href: string | undefined };

const Item = ({ setting }: { setting: SettingItem }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() => (setting.href ? navigation.navigate(setting.href as never) : undefined)}
        >
            <View style={style.item}>
                <View>{setting.icon}</View>
                <CustomText style={style.itemText}>{setting.title}</CustomText>
            </View>
        </Pressable>
    );
};

export default function Setting() {
    const { currentLang } = useLanguage();
    const { t } = useTranslation();
    const data = useMemo<SettingItem[]>(() => {
        return [
            {
                title: t("setting.menu.language"),
                href: "language",
                icon: <MaterialIcons name="language" size={24} color="black" />,
            },
        ];
    }, [currentLang]);
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item setting={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
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
