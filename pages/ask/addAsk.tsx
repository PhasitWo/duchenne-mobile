import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import { darkGrey, tint } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

type props = NativeStackScreenProps<any, "addAsk">;
export default function AddAsk({ navigation }: props) {
    const { lang } = useLanguage();
    const [topic, setTopic] = useState("");
    const [question, setQuestion] = useState("");
    // Warning before goback
    useEffect(
        () =>
            navigation.addListener("beforeRemove", (e) => {
                // no input -> don't do anything
                if (topic.trim().length === 0 && question.trim().length === 0) return;
                e.preventDefault();
                Alert.alert(
                    lang("คุณยังไม่ได้ส่งคำถาม", "Discard Question?"),
                    lang(
                        "แน่ใจหรือไม่ที่จะออกจากหน้านี้โดยยังไม่ได้ส่งคำถาม?",
                        "Are you sure to discard them and leave the screen?"
                    ),
                    [
                        { text: lang("อยู่ต่อ", "Stay"), style: "cancel", onPress: () => {} },
                        { text: lang("ออก", "Discard"), style: "destructive", onPress: () => navigation.dispatch(e.data.action) },
                    ]
                );
            }),
        [navigation, topic, question]
    );

    function handleTopicChange(text: string) {
        if (text.length > 30) return;
        setTopic(text);
    }
    function handleQuestionChange(text: string) {
        if (text.length > 500) return;
        setQuestion(text);
    }
    function handleSubmit() {
        if (topic.trim().length === 0) {
            Alert.alert(lang("เกิดข้อผิดพลาด", "Error"), lang("กรุณากรอกหัวข้อ", "Topic cannot be empty."));
            return;
        }
        if (question.trim().length === 0) {
            Alert.alert(lang("เกิดข้อผิดพลาด", "Error"), lang("กรุณากรอกคำถาม", "Question cannot be empty."));
            return;
        }
        //TODO handle submiting question
    }

    return (
        <View style={style.container}>
            <View style={style.topicContainer}>
                <Text style={[{ color: topic.length == 0 ? "red" : "black" }, style.label]}>
                    {lang("หัวข้อ  ", "Topic  ")}
                    <Count current={topic.length} max={30} />
                </Text>
                <TextInput style={style.topicInput} value={topic} onChangeText={handleTopicChange} />
            </View>
            <View style={style.bodyContainer}>
                <Text style={[{ color: question.length == 0 ? "red" : "black" }, style.label]}>
                    {lang("คำถาม  ", "Question  ")}
                    <Count current={question.length} max={500} />
                </Text>
                <TextInput
                    style={style.bodyInput}
                    multiline
                    returnKeyType="done"
                    value={question}
                    onChangeText={handleQuestionChange}
                />
            </View>
            <CustomButton normalColor={tint} pressedColor={darkGrey} title={lang("ส่ง", "submit")} onPress={handleSubmit} />
        </View>
    );
}

type CountParam = { max: number; current: number };
const Count = ({ max, current }: CountParam) => <Text style={style.count}>{`(${current}/${max})`}</Text>;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
