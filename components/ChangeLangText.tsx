import { useLanguage } from "@/hooks/useLanguage";
import { Text } from "react-native";
import { type TextStyle } from "react-native";

export default function ChangeLangText({ style }: { style?: TextStyle }) {
    const { changeLang, currentLang } = useLanguage();
    return (
        <Text style={style}>
            <Text onPress={() => changeLang("th")} style={{ fontWeight: currentLang === "th" ? "bold" : "normal" }}>
                ภาษาไทย
            </Text>{" "}
            |{" "}
            <Text onPress={() => changeLang("en")} style={{ fontWeight: currentLang === "en" ? "bold" : "normal" }}>
                English
            </Text>
        </Text>
    );
}
