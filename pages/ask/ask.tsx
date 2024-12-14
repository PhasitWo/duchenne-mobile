import { View, Alert, StyleSheet, Pressable, Text, FlatList, RefreshControl } from "react-native";
import QuestionCard, { QuestionTopic } from "@/components/QuestionCard";
import { useLanguage } from "@/hooks/useLanguage";
import { darkGrey } from "@/constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AskStackParamList } from "./_stack";
import { useCallback, useEffect, useState } from "react";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "@/hooks/authContext";
import { ApiQuestionTopicModel } from "@/model/model";
import { useFocusEffect } from "@react-navigation/native";
import SwipeHand from "@/components/SwipeHand";
import useTutorial from "@/hooks/useTutorial";

// const data: CardParam[] = [
//     { id: 1, title: "Question 1", bodyText: "A doctor replied" },
//     { id: 2, title: "Question 2", bodyText: "No reply" },
//     { id: 3, title: "Question 3", bodyText: "A doctor replied" },
//     { id: 4, title: "Question 4", bodyText: "A doctor replied" },
//     { id: 5, title: "Question 4", bodyText: "A doctor replied" },
//     { id: 6, title: "Question 4", bodyText: "A doctor replied" },
//     { id: 7, title: "Question 4", bodyText: "A doctor replied" },
// ];

type props = NativeStackScreenProps<AskStackParamList, "index">;
export default function Ask({ navigation }: props) {
    const [topicList, setTopicList] = useState<QuestionTopic[]>([]);
    const [showTutorial, setShowTutorial] = useState(false)
    const { lang, currentLang } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();

    // tutorial onmount
    useEffect(() => {
        const { getShowAskTutorial, setShowAskTutorial } = useTutorial();
        getShowAskTutorial().then((value) => setShowTutorial(value));
        setTimeout(() => {
            setShowTutorial(false);
            setShowAskTutorial(false);
        }, 5200);
    }, []);

    const fetch = async () => {
        setIsLoading(true);
        try {
            const response = await api.get<any, AxiosResponse<ApiQuestionTopicModel[], any>, any>("/api/question");
            switch (response.status) {
                case 200:
                    setTopicList(
                        response.data.map((v) => ({
                            id: v.id,
                            title: v.topic,
                            unixTime: v.createAt,
                            hasReply: Boolean(v.answerAt),
                        }))
                    );
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

    // fetch data on focus
    useFocusEffect(
        useCallback(() => {
            fetch();
        }, [currentLang])
    );

    return (
        <View style={style.container}>
            {showTutorial && <SwipeHand from={50} to={350} />}
            {topicList.length == 0 && <Text style={{ marginTop: 10 }}>{lang("ไม่มีคำถาม", "No Question")}</Text>}
            <FlatList
                contentContainerStyle={{ paddingBottom: 150 }}
                data={topicList}
                renderItem={({ item }) => (
                    <QuestionCard
                        questionTopic={item}
                        onPress={() => navigation.navigate("viewAsk", { id: item.id as number })}
                    />
                )}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetch} />}
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
    container: { justifyContent: "center", alignItems: "center", flex: 1 },
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
