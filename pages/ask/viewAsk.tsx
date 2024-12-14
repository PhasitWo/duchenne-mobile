import { View, Text, StyleSheet, ActivityIndicator, Alert, Pressable } from "react-native";
import { darkGrey, tint } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Dayjs } from "dayjs";
import type { AskStackParamList } from "./_stack";
import dayjs from "dayjs";
import Fontisto from "@expo/vector-icons/Fontisto";
import LoadingView from "@/components/LoadingView";
import { useApiContext } from "@/hooks/apiContext";
import { useAuthContext } from "@/hooks/authContext";
import { AxiosError, AxiosResponse } from "axios";
import { ApiQuestionModel } from "@/model/model";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Question = {
    createAt: Dayjs | null;
    topic: string;
    question: string;
};

type Answer = {
    answerAt: Dayjs | null;
    doctor: string;
    answer: string;
};

type props = NativeStackScreenProps<AskStackParamList, "viewAsk">;
export default function ViewAsk({ navigation, route }: props) {
    const { lang, currentLang } = useLanguage();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [question, setQuestion] = useState<Question>({
        createAt: null,
        topic: "-",
        question: "-",
    });
    const [answer, setAnswer] = useState<Answer | null>(null);
    const { id } = route.params;
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();

    function showDeleteAlert() {
        Alert.alert(
            lang("คุณแน่ใจหรือไม่", "Are you sure?"),
            lang("คุณกำลังลบคำถามนี้", "You are deleting this question"),
            [{ text: "Delete", onPress: handleDelete }, { text: "Cancel" }],
            { cancelable: true }
        );
    }

    async function handleDelete() {
        try {
            setIsLoading(true);
            const response = await api.delete("/api/question/" + id);
            switch (response.status) {
                case 204:
                    Alert.alert("", lang("ลบคำถามแล้ว", "Deleted successfully"));
                    navigation.navigate("index");
                    break;
                case 401:
                    Alert.alert("Error", "Unauthorized, Invalid token");
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.message ?? ""} ${err.code}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    // Fetch question and answer
    const fetch = async () => {
        setIsLoading(true);
        try {
            const response = await api.get<any, AxiosResponse<ApiQuestionModel, any>, any>("/api/question/" + id);
            switch (response.status) {
                case 200:
                    setQuestion({
                        createAt: dayjs(response.data.createAt * 1000),
                        topic: response.data.topic,
                        question: response.data.question,
                    });
                    if (response.data.answer)
                        setAnswer({
                            answerAt: dayjs((response.data.answerAt as number) * 1000),
                            doctor: `${response.data.doctor?.firstName} ${response.data.doctor?.middleName} ${response.data.doctor?.lastName}`,
                            answer: response.data.answer,
                        });
                    break;
                case 401:
                    Alert.alert("Error", "Unauthorized, Invalid token");
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.message ?? ""} ${err.code}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    if (isLoading) return <LoadingView />;

    return (
        <View style={style.container}>
            <View style={style.questionContainer}>
                <Text style={style.boldText}>{question.topic} </Text>
                <Text style={style.date}>{question.createAt?.locale(currentLang).format("D MMMM YYYY  HH:mm")}</Text>
                <Text style={style.body}>{question.question}</Text>
                <Pressable style={style.bin} onPress={showDeleteAlert}>
                    <FontAwesome name="trash-o" size={20} color="red" style={{}} />
                </Pressable>
            </View>
            {answer ? (
                <View style={style.answerContainer}>
                    <View style={style.answerHeader}>
                        <View style={style.doctorIcon}>
                            <Fontisto name="doctor" size={24} color="black" />
                        </View>
                        <View style={style.doctorNameContainer}>
                            <Text style={style.doctorName}>{answer.doctor}</Text>
                            <Text style={style.date}>
                                {answer.answerAt?.locale(currentLang).format("D MMMM YYYY  HH:mm")}
                            </Text>
                        </View>
                    </View>
                    <Text style={style.body}>{answer.answer}</Text>
                </View>
            ) : (
                <Text style={{ marginTop: 10 }}>No Reply</Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    questionContainer: {
        width: "100%",
        padding: 20,
        minHeight: 120,
        backgroundColor: "white",
    },
    body: { marginTop: 20, marginBottom: 20 },
    answerContainer: {
        width: "100%",
        padding: 20,
        marginTop: 5,
        minHeight: 150,
        backgroundColor: "white",
    },
    answerHeader: { flexDirection: "row", alignItems: "center" },
    doctorIcon: {
        backgroundColor: darkGrey,
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "grey",
    },
    doctorNameContainer: {
        marginLeft: 10,
    },
    doctorName: {
        textAlignVertical: "center",

        fontWeight: "bold",
    },
    boldText: {
        fontWeight: "bold",
    },
    date: {
        fontWeight: "normal",
        fontSize: 12,
        color: "grey",
    },
    bin: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
        height: "auto",
    },
});
