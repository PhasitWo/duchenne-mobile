import { View, ScrollView, Alert, StyleSheet, Pressable, Text } from "react-native";
import Card from "@/components/Card";

const mockup = [
    { title: "Question 1", bodyText: "5 January 2025\n10 replies" },
    { title: "Question 2", bodyText: "5 January 2025\n3 replies" },
    { title: "Question 3", bodyText: "5 January 2025\n1 replies" },
    { title: "Question 4", bodyText: "5 January 2025\n2 replies" },
    { title: "Question 4", bodyText: "5 January 2025\n2 replies" },
    { title: "Question 4", bodyText: "5 January 2025\n2 replies" },
    { title: "Question 4", bodyText: "5 January 2025\n2 replies" },
];

export default function Ask() {
    return (
        <View style={{ height: "100%" }}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                {mockup.map((v, k) => (
                    <Card
                        key={k}
                        title={v.title}
                        bodyText={v.bodyText}
                        onPress={() => Alert.alert("HI", "1234")}
                    />
                ))}
            </ScrollView>
            <Pressable style={style.button}>
                <Text>+ New Topic</Text>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    button: {
        backgroundColor: "white",
        height: "7%",
        width: "25%",
        borderRadius: 100,
        position: "absolute",
        bottom: "5%",
        right: "5%",
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
