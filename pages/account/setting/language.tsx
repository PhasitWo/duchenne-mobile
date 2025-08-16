import { useState, useEffect, ReactElement } from "react";
import { useLanguage, type Language as Lang } from "@/hooks/useLanguage";
import { darkGrey } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, View, StyleSheet, FlatList, Image } from "react-native";
import CustomText from "@/components/CustomText";

type LangItemProps = { title: string; value: Lang; icon: ReactElement };

const data: LangItemProps[] = [
    {
        title: "ไทย",
        value: "th",
        icon: <Image source={require("@/assets/images/flags/th.png")} style={{ width: 30, height: 30 }} />,
    },
    {
        title: "English",
        value: "en",
        icon: <Image source={require("@/assets/images/flags/en.png")} style={{ width: 30, height: 30 }} />,
    },
];

const Item = ({ lang, selected, pressFunc }: { lang: LangItemProps; selected: boolean; pressFunc: Function }) => {
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() => pressFunc()}
        >
            <View style={style.item}>
                <View>{lang.icon}</View>
                <CustomText style={style.itemText}>{lang.title}</CustomText>
            </View>
            {selected && <FontAwesome name="check" size={24} color="green" />}
        </Pressable>
    );
};

export default function Language() {
    const [selectedId, setSelectedId] = useState<Lang | undefined>();
    const { currentLang, changeLang } = useLanguage();

    useEffect(() => {
        setSelectedId(currentLang);
    }, []);

    async function handlePress(selectedId: Lang) {
        setSelectedId(selectedId);
        changeLang(selectedId);
    }

    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item lang={item} selected={selectedId === item.value} pressFunc={() => handlePress(item.value)} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </>
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

// const radioButtons: RadioButtonProps[] = useMemo<RadioButtonProps[]>(
//     () => [
//         {
//             id: "th", // acts as primary key, should be unique and non-empty string
//             label: "ไทย",
//             value: "th",
//             containerStyle: {
//                 width: 100,
//             },
//         },
//         {
//             id: "en",
//             label: "English",
//             value: "en",
//             containerStyle: {
//                 width: 100,
//             },
//         },
//     ],
//     []
// );

// <RadioGroup
//     radioButtons={radioButtons}
//     onPress={handlePress}
//     selectedId={selectedId}
//     containerStyle={{
//         backgroundColor: "white",
//         borderColor: darkGrey,
//         borderWidth: 1,
//         height: 100,
//         justifyContent: "center",
//     }}
//     layout="column"
// />;
