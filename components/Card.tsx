import { View, Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { darkGrey } from "@/constants/Colors";

export type CardParam = { title: string; bodyText: string };

export default function Card({ title, bodyText, ...rest }: CardParam & PressableProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? darkGrey : "white" },
                style.container,
            ]}
            {...rest}
        >
            <Text style={style.title}>{title}</Text>
            <Text>{bodyText}</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 30,
        width: "90%",
        height: 120,
        marginTop: "3%",
        padding: 25,
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    body: {},
});
