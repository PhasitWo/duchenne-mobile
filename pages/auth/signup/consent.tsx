import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SignupStackParamList } from "./_stack";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<SignupStackParamList, "index">;
export default function Consent({ navigation }: Props) {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 20, alignItems: "center" }}>
            <Text style={style.header}>{t("consent.term")}</Text>
            <Text style={style.body}>{t("consent.consent_body")}</Text>
            <Text style={[style.header, { marginTop: 30 }]}>{t("privacy.title")}</Text>
            <Text style={style.body}>{t("consent.privacy_intro")}</Text>
            <Text style={[style.body, { marginTop: 10, alignSelf: "flex-start" }]}>{t("consent.privacy_pointer")}</Text>
            <Text
                style={[style.body, { color: "blue", alignSelf: "flex-start", textDecorationLine: "underline" }]}
                onPress={() => navigation.navigate("privacy")}
            >
                {t("privacy.title")}
            </Text>
            <CustomButton
                title={t("consent.accept")}
                normalColor={color.tint}
                pressedColor={darkGrey}
                style={{ height: 60, borderRadius: 10, marginTop: 30 }}
                bold
                onPress={() => navigation.navigate("signup1")}
            />
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 15,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
});
