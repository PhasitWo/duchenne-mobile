import { Text, View, FlatList, StyleSheet, Dimensions, Pressable, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { darkGrey } from "@/constants/Colors";
import { ReactElement, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuthContext } from "@/hooks/authContext";
import LoadingView from "@/components/LoadingView";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError } from "axios";

type Menu = { title: string; icon: ReactElement; href?: string | undefined; customOnPress?: Function };

const Item = ({ menu }: { menu: Menu }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() =>
                menu.href ? navigation.navigate(menu.href as never) : menu.customOnPress ? menu.customOnPress() : undefined
            }
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
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const data = useMemo<Menu[]>(() => {
        return [
            { title: lang("โปรไฟล์", "Profile"), href: "profile", icon: <Ionicons name="person" size={24} color="black" /> },
            { title: lang("การตั้งค่า", "Setting"), href: "setting", icon: <FontAwesome name="gear" size={24} color="black" /> },
            {
                title: lang("ออกจากระบบ", "Logout"),
                customOnPress: showAlertLogout,
                icon: <Ionicons name="exit-outline" size={24} color="black" />,
            },
        ];
    }, [currentLang]);

    function showAlertLogout() {
        Alert.alert(
            lang("คุณแน่ใจหรือไม่", "Are you sure?"),
            lang("คุณกำลังจะออกจากระบบ", "You're trying to log out"),
            [{ text: lang("ออกจากระบบ", "Log out"), onPress: handleLogout }, { text: lang("ยกเลิก", "Cancel") }],
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
                    Alert.alert(lang("ออกจากระบบเสร็จสิ้น","Logout successfully"));
                    break;
                case 401:
                    Alert.alert(lang("เกิดข้อผิดพลาด","Error"), lang("ออกจากระบบโดยไม่ได้ลบอุปกรณ์ออกจากฐานข้อมูล","Logout without removing this device from the database"));
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert(
                    "Request Error",
                    `${err.status ?? ""} ${err.code}\n${lang(
                        "ออกจากระบบโดยไม่ได้ลบอุปกรณ์ออกจากฐานข้อมูล",
                        "Logout without removing this device from the database"
                    )}`
                );
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
                flex: 1,
            }}
        >
            <FlatList data={data} renderItem={({ item }) => <Item menu={item} />} showsVerticalScrollIndicator={false} />
            {isLoading && <LoadingView />}
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
