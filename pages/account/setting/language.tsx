import { useMemo, useState, useEffect, ReactElement } from "react";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { useLanguage, type language } from "@/hooks/useLanguage";
import { RadioButton } from "react-native-radio-buttons-group";
import { darkGrey } from "@/constants/Colors";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Pressable, View, Text, StyleSheet, Dimensions, FlatList } from "react-native";

type langItemProps = { title: string; value: string; icon: ReactElement };

const data: langItemProps[] = [
    { title: "ไทย", value: "th", icon: <MaterialIcons name="language" size={24} color="black" /> },
    { title: "English", value: "en", icon: <MaterialIcons name="language" size={24} color="black" /> },
];

const Item = ({ lang, selected, pressFunc }: { lang: langItemProps; selected: boolean; pressFunc: Function }) => {
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.itemContainer]}
            onPress={() => pressFunc()}
        >
            <View style={style.item}>
                <View>{lang.icon}</View>
                <Text style={style.itemText}>{lang.title}</Text>
            </View>
            {selected && <FontAwesome name="check" size={24} color="green" />}
        </Pressable>
    );
};

export default function Language() {
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const { currentLang, changeLang } = useLanguage();

    useEffect(() => {
        setSelectedId(currentLang);
    }, []);

    async function handlePress(selectedId: string) {
        setSelectedId(selectedId);
        changeLang(selectedId as language);
    }

    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item lang={item} selected={selectedId === item.value} pressFunc={() => handlePress(item.value)} />
                )}
            />
        </>
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
