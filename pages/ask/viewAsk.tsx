import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { darkGrey, tint } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import type { Dayjs } from "dayjs";
import type { AskStackParamList } from "./_stack";
import dayjs from "dayjs";
import Fontisto from "@expo/vector-icons/Fontisto";
import LoadingView from "@/components/LoadingView";

type Question = {
    createAt: Dayjs | null;
    topic: string;
    body: string;
};

type Answer = {
    createAt: Dayjs | null;
    doctor: string;
    body: string;
};

type props = NativeStackScreenProps<AskStackParamList, "viewAsk">;
export default function ViewAsk({ navigation, route }: props) {
    const { lang, currentLang } = useLanguage();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [question, setQuestion] = useState<Question>({
        createAt: dayjs(),
        topic: "djakslkj asdlkjlk",
        body: "daskdjjl lasjlaskjdlaskdjasldjkj asdkjlkajsdlkaslkdjlkjsadasdasjdjalskdjsaldjlkjlkjasldkjasldjasldjasldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjldjlkjlkjasldkjasldjasldjasldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalsk",
    });
    const [answer, setAnswer] = useState<Answer | null>({
        createAt: dayjs(),
        doctor: "Dr.Spiderman",
        body: "daskdjjl lasjlaskjdlaskdjasldjkj asdkjlkajsdlkaslkdjlkjsadasdasjdjalskdjsaldjlkjlkjasldkjasldjasldjasldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjldjlkjlkjasldkjasldjasldjasldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalskdjsaldjlkjasjdjalsk",
    });
    const { id } = route.params;
    console.log("id => " + id);
    // Fetch question and answer
    const fetchData = async () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading)
        return (
            <LoadingView/>
        );

    return (
        <View style={style.container}>
            <View style={style.questionContainer}>
                <Text style={style.boldText}>{question.topic} </Text>
                <Text style={style.date}>{question.createAt?.locale(currentLang).format("HH:mm  D MMMM YYYY")}</Text>
                <Text style={style.body}>{question.body}</Text>
            </View>
            {answer ? (
                <View style={style.answerContainer}>
                    <View style={style.answerHeader}>
                        <View style={style.doctorIcon}>
                            <Fontisto name="doctor" size={24} color="black" />
                        </View>
                        <View style={style.doctorNameContainer}>
                            <Text style={style.doctorName}>{answer.doctor}</Text>
                            <Text style={style.date}>{answer.createAt?.locale(currentLang).format("HH:mm  D MMMM YYYY")}</Text>
                        </View>
                    </View>
                    <Text style={style.body}>{answer.body}</Text>
                </View>
            ) : (
                <Text>No Reply</Text>
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
});
