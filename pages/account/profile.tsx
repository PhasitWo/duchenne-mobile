import { Text, View, FlatList, StyleSheet, Dimensions, Pressable } from "react-native";
import { darkGrey } from "@/constants/Colors";
import { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";

type Info = { title: string; value: string | number; border?: boolean };

const Item = ({ info }: { info: Info }) => {
    return (
        <Pressable
            onPress={async () => {
                try {
                    let res = await fetch("http://192.168.1.114:8080/", {
                        method: "GET",
                    });
                    console.log(await res.json());
                } catch (err: any) {
                    console.log(err.message);
                }
            }}
            style={({ pressed }) => [
                { backgroundColor: pressed ? darkGrey : "white", borderTopWidth: info.border ? 1 : 0 },
                style.itemContainer,
            ]}
        >
            <View style={style.item}>
                <Text style={style.itemTitle}>{info.title}</Text>
                <Text style={style.itemValue}>{info.value}</Text>
            </View>
        </Pressable>
    );
};

export default function Profile() {
    const { lang, currentLang } = useLanguage();
    const [userInfo, setUserInfo] = useState();
    const data = useMemo<Info[]>(() => {
        return [
            { title: lang("ชื่อ", "First Name"), value: "test" },
            { title: lang("นามสกุล", "Last Name"), value: "test" },
            { title: lang("เพศ", "Gender"), value: "test" },
            { title: lang("รหัส HN", "HN Number"), value: "test", border: true },
            { title: lang("เบอร์โทรศัพท์", "Phone Number"), value: "090-000-0000" },
        ];
    }, [currentLang, userInfo]);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList data={data} renderItem={({ item }) => <Item info={item} />} />
        </View>
    );
}

const style = StyleSheet.create({
    itemContainer: {
        height: 75,
        justifyContent: "space-between",
        borderTopColor: darkGrey,
        alignItems: "flex-start",
        paddingLeft: 30,
        paddingRight: 30,
    },
    item: {
        flex: 1,
        justifyContent: "center",
        rowGap: 10,
    },
    itemTitle: { fontWeight: "bold" },
    itemValue: {},
});
