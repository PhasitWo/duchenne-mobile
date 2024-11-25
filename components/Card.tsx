import { View, Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { darkGrey } from "@/constants/Colors";

export type CardParam = {id?: number, title: string; bodyText: string };

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
        width: 350,
        height: 120,
        marginTop: 20,
        padding: 25,
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    body: {},
});
