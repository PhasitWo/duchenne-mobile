import { View, ScrollView, Alert, StyleSheet, Pressable, Text, FlatList } from "react-native";
import Card, { CardParam } from "@/components/Card";
import { useLanguage } from "@/hooks/useLanguage";
import { darkGrey } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";

const data: CardParam[] = [
    { title: "Question 1", bodyText: "A doctor replied" },
    { title: "Question 2", bodyText: "No reply" },
    { title: "Question 3", bodyText: "A doctor replied" },
    { title: "Question 4", bodyText: "A doctor replied" },
    { title: "Question 4", bodyText: "A doctor replied" },
    { title: "Question 4", bodyText: "A doctor replied" },
    { title: "Question 4", bodyText: "A doctor replied" },
];

export default function Ask() {
    const { lang } = useLanguage();
    const navigation = useNavigation();
    return (
        <View style={style.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Card title={item.title} bodyText={item.bodyText} />}
                showsVerticalScrollIndicator={false}
            />
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.button]}
                onPress={() => navigation.navigate("addAsk" as never)}
            >
                <Text>{lang("+ ส่งคำถาม", "+ New Question")}</Text>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    container: { justifyContent: "center", alignItems: "center" },
    button: {
        height: 50,
        width: "auto",
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 100,
        position: "absolute",
        bottom: 40,
        right: 20,
        shadowRadius: 8,
        shadowColor: "#26fbd4",
        shadowOpacity: 1,
        elevation: 8,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#26fbd4",
        borderWidth: 1,
    },
});
