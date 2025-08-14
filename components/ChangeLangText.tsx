import { useLanguage } from "@/hooks/useLanguage";
import { Image, Pressable, StyleSheet } from "react-native";
import { type PressableProps } from "react-native";

export default function ChangeLangText(props: PressableProps) {
    const { changeLang, currentLang } = useLanguage();
    return (
        <Pressable {...props} onPress={() => changeLang(currentLang === "th" ? "en" : "th")}>
            {currentLang === "th" ? (
                <Image source={require("@/assets/images/flags/th.png")} style={style.flag} />
            ) : (
                <Image source={require("@/assets/images/flags/en.png")} style={style.flag} />
            )}
        </Pressable>
    );
}

const style = StyleSheet.create({
    flag: {
        width: 30,
        height: 30,
    },
});
