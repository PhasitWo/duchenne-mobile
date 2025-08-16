import { StyleSheet, Pressable, PressableProps, View } from "react-native";
import { darkGrey } from "@/constants/Colors";
import dayjs from "dayjs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import CustomText from "./CustomText";

export type QuestionTopic = { id: number; title: string; unixTime: number; hasReply: boolean };

export default function QuestionCard({ questionTopic, ...rest }: { questionTopic: QuestionTopic } & PressableProps) {
    const { t } = useTranslation();
    return (
        <Pressable
            key={questionTopic.id}
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.container]}
            {...rest}
        >
            <CustomText numberOfLines={1} style={style.title}>
                {questionTopic.title}
            </CustomText>
            <View style={style.timeContainer}>
                <CustomText style={style.time}>
                    {dayjs(questionTopic.unixTime * 1000).format("D/MM/YYYY HH:mm ")}
                </CustomText>
                {questionTopic.hasReply ? (
                    <MaterialCommunityIcons name="reply-circle" size={15} color="green" />
                ) : (
                    <MaterialIcons name="pending" size={15} color="salmon" />
                )}
            </View>
            <CustomText>{questionTopic.hasReply ? t("questionCard.replied") : t("questionCard.no_reply")}</CustomText>
        </Pressable>
    );
}
const style = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 350,
        height: 140,
        marginTop: 20,
        padding: 25,
        filter: "drop-shadow(0px 4px 3px rgba(0,0,0,0.1))",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
