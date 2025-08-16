import { View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { color, darkGrey } from "@/constants/Colors";
import { ReactElement, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuthContext } from "@/hooks/authContext";
import LoadingView from "@/components/LoadingView";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError } from "axios";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useTranslation } from "react-i18next";
import CustomText from "@/components/CustomText";

type Menu = { title: string; icon: ReactElement; href?: string | undefined; customOnPress?: Function };

const Item = ({ menu }: { menu: Menu }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() =>
                menu.href
                    ? navigation.navigate(menu.href as never)
                    : menu.customOnPress
                      ? menu.customOnPress()
                      : undefined
            }
        >
            <View style={style.item}>
                <View style={style.itemIcon}>{menu.icon}</View>
                <CustomText style={style.itemText}>{menu.title}</CustomText>
            </View>
            <FontAwesome name="chevron-right" size={15} color="black" />
        </Pressable>
    );
};

export default function Account() {
    const { currentLang } = useLanguage();
    const { t } = useTranslation();
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const data = useMemo<Menu[]>(() => {
        return [
            {
                title: t("account.menu.profile"),
                href: "profile",
                icon: <Ionicons name="person" size={24} color="black" />,
            },
            {
                title: t("account.menu.medicine"),
                href: "medicine",
                icon: <Fontisto name="drug-pack" size={24} color="black" />,
            },
            {
                title: t("account.menu.vaccine"),
                href: "vaccine",
                icon: <Fontisto name="injection-syringe" size={24} color="black" />,
            },
            {
                title: t("account.menu.setting"),
                href: "setting",
                icon: <FontAwesome name="gear" size={24} color="black" />,
            },
            {
                title: t("account.menu.logout"),
                customOnPress: showAlertLogout,
                icon: <Ionicons name="exit-outline" size={24} color="black" />,
            },
        ];
    }, [currentLang]);

    function showAlertLogout() {
        Alert.alert(
            t("common.alert.sure"),
            t("account.alert.logging_out"),
            [{ text: t("account.alert.logout"), onPress: handleLogout }, { text: t("common.alert.cancel") }],
            { cancelable: true }
        );
    }

    async function handleLogout() {
        // POST
        setIsLoading(true);
        try {
            const response = await api.post("/auth/logout");
            switch (response.status) {
                case 200:
                    Alert.alert(t("account.alert.200"));
                    break;
                case 401:
                    Alert.alert(t("common.alert.error"), t("account.alert.401"));
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.status ?? ""} ${err.code}\n${t("account.alert.401")}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
            logoutDispatch();
        }
    }

    return (
        <View
            style={{
                backgroundColor: color.base,
            }}
        >
            <FlatList
                data={data}
                renderItem={({ item }) => <Item menu={item} />}
                showsVerticalScrollIndicator={false}
            />
            {isLoading && <LoadingView />}
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
