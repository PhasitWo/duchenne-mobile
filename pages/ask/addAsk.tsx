import { View, TextInput, Text, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey, tint } from "@/constants/Colors";
import { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useApiContext } from "@/hooks/apiContext";
import { useAuthContext } from "@/hooks/authContext";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

type props = NativeStackScreenProps<any, "addAsk">;
export default function AddAsk({ navigation }: props) {
    const { t } = useTranslation();
    const [topic, setTopic] = useState("");
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    // Warning before goback
    useEffect(
        () =>
            navigation.addListener("beforeRemove", (e) => {
                // no input -> don't do anything
                if (topic.trim().length === 0 && question.trim().length === 0) return;
                e.preventDefault();
                Alert.alert(t("addAsk.alert.discard"), t("addAsk.alert.discard_body"), [
                    {
                        text: t("common.alert.stay"),
                        style: "cancel",
                        onPress: () => {},
                    },
                    {
                        text: t("common.alert.discard"),
                        style: "destructive",
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]);
            }),
        [navigation, topic, question]
    );

    function handleTopicChange(text: string) {
        if (text.length > 50) return;
        setTopic(text);
    }
    function handleQuestionChange(text: string) {
        if (text.length > 700) return;
        setQuestion(text);
    }
    function showSubmitAlert() {
        if (topic.trim().length === 0) {
            Alert.alert(t("common.alert.error"), t("addAsk.alert.empty_topic"));
            return;
        }
        if (question.trim().length === 0) {
            Alert.alert(t("common.alert.error"), t("addAsk.alert.empty_question"));
            return;
        }
        Alert.alert(t("common.alert.sure"), undefined, [
            {
                text: t("common.alert.confirm"),
                onPress: handleSubmit,
            },
            {
                text: t("common.alert.cancel"),
            },
        ]);
    }

    async function handleSubmit() {
        try {
            setIsLoading(true);
            const response = await api.post("/api/question", { topic: topic, question: question });
            switch (response.status) {
                case 201:
                    Alert.alert(t("addAsk.alert.201"), undefined);
                    navigation.navigate("tab", { screen: "ask" });
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

    return (
        <KeyboardAvoidingView style={style.container} behavior="padding">
            <ScrollView style={{ width: "100%" }}>
                <View style={style.topicContainer}>
                    <Text style={[{ color: topic.length == 0 ? "red" : "black" }, style.label]}>
                        {t("addAsk.topic")}
                        <Count current={topic.length} max={50} />
                    </Text>
                    <TextInput
                        style={style.topicInput}
                        value={topic}
                        onChangeText={handleTopicChange}
                        editable={!isLoading}
                    />
                </View>
                <View style={style.bodyContainer}>
                    <Text style={[{ color: question.length == 0 ? "red" : "black" }, style.label]}>
                        {t("addAsk.question")}
                        <Count current={question.length} max={700} />
                    </Text>
                    <TextInput
                        style={style.bodyInput}
                        multiline
                        submitBehavior="blurAndSubmit"
                        returnKeyType="done"
                        value={question}
                        onChangeText={handleQuestionChange}
                        editable={!isLoading}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <CustomButton
                        normalColor={tint}
                        pressedColor={darkGrey}
                        title={t("common.submit")}
                        onPress={showSubmitAlert}
                        showLoading={isLoading}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

type CountParam = { max: number; current: number };
const Count = ({ max, current }: CountParam) => <Text style={style.count}>{`(${current}/${max})`}</Text>;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: color.base,
    },
    topicContainer: {
        width: "100%",
        padding: 20,
        height: 120,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    topicInput: {
        borderBottomWidth: 1,
        borderColor: darkGrey,
    },
    bodyContainer: {
        width: "100%",
        padding: 20,
        marginTop: 5,
        height: 400,
        backgroundColor: "white",
        filter: "drop-shadow(0px 4px 3px rgba(0,0,0,0.1))",
    },
    bodyInput: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: darkGrey,
        borderRadius: 20,
        height: 320,
        textAlignVertical: "top",
        padding: 10,
    },
    label: {
        fontWeight: "bold",
    },
    count: {
        fontWeight: "normal",
    },
});
