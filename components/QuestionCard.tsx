import { Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { darkGrey } from "@/constants/Colors";
import dayjs from "dayjs";

export type QuestionTopic = { id: number; title: string; unixTime: number; text: string };

export default function QuestionCard({ questionTopic, ...rest }: { questionTopic: QuestionTopic } & PressableProps) {
    return (
        <Pressable
            key={questionTopic.id}
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.container]}
            {...rest}
        >
            <Text style={style.title}>{questionTopic.title}</Text>
            <Text style={style.time}>{dayjs(questionTopic.unixTime * 1000).format("D/MM/YYYY HH:mm")}</Text>
            <Text>{questionTopic.text}</Text>
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
    },
    time: {
        color: "darkgrey",
        marginBottom: 10,
    },
});
