import { Text, StyleSheet, Pressable, PressableProps, View } from "react-native";
import { darkGrey } from "@/constants/Colors";
import dayjs from "dayjs";
import { useLanguage } from "@/hooks/useLanguage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export type QuestionTopic = { id: number; title: string; unixTime: number; hasReply: boolean };

export default function QuestionCard({ questionTopic, ...rest }: { questionTopic: QuestionTopic } & PressableProps) {
    const { lang } = useLanguage();
    return (
        <Pressable
            key={questionTopic.id}
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.container]}
            {...rest}
        >
            <Text numberOfLines={1} style={style.title}>
                {questionTopic.title}
            </Text>
            <View style={style.timeContainer}>
                <Text style={style.time}>{dayjs(questionTopic.unixTime * 1000).format("D/MM/YYYY HH:mm ")}</Text>
                {questionTopic.hasReply ? (
                    <MaterialCommunityIcons name="reply-circle" size={15} color="green" />
                ) : (
                    <MaterialIcons name="pending" size={15} color="salmon" />
                )}
            </View>
            <Text>
                {questionTopic.hasReply
                    ? lang("แพทย์ตอบกลับแล้ว", "A doctor replied")
                    : lang("ไม่มีการตอบกลับ", "No reply")}
            </Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 350,
        height: 120,
        marginTop: 20,
        padding: 25,
        filter: "drop-shadow(0px 4px 3px rgba(0,0,0,0.1))",
    },
    title: {
        fontWeight: "bold",
    },
    time: {
        color: "darkgrey",
    },
    timeContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
    },
});
